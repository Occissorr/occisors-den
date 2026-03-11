import os
import re
import pickle
import secrets
import requests

from threading import Thread
from urllib.parse import urlparse
from bson import ObjectId

from flask import (
    Blueprint, Flask, jsonify, render_template,
    send_from_directory, redirect, request, session, url_for
)

from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix

from pymongo import MongoClient, server_api
from waitress import serve

from google_auth_oauthlib.flow import Flow

import cloudinary
import cloudinary.uploader

import Bot_Props
from mcp_engine.mcp_server import run_mcp

# ---------------------------------------------------
# Environment Setup
# ---------------------------------------------------



# ---------------------------------------------------
# Flask Setup
# ---------------------------------------------------

app = Flask(__name__, static_folder="build", template_folder="build")
app.secret_key = secrets.token_hex(32)

app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_port=1)

CORS(app, supports_credentials=True)

# ---------------------------------------------------
# Rate Limiting
# ---------------------------------------------------

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

# ---------------------------------------------------
# MongoDB
# ---------------------------------------------------

client = MongoClient(
    Bot_Props.mongo_uri,
    server_api=server_api.ServerApi('1')
)

db = client["myDatabase"]

server_stats_collection = db["server_stats"]
auth_tokens_collection = db["auth_tokens"]
articles = db["articles"]
admins = db["admins"]

try:
    client.admin.command("ping")
    print("✅ Connected to MongoDB")
except Exception as e:
    print("❌ MongoDB connection error:", e)


def initialize_database():
    try:
        server_stats_collection.create_index("server_id", unique=True)
        print("Database initialized")
    except Exception as e:
        print("DB init error:", e)


# ---------------------------------------------------
# Cloudinary
# ---------------------------------------------------

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

# ---------------------------------------------------
# Blueprints
# ---------------------------------------------------

api_bp = Blueprint("api", __name__, url_prefix="/api")
article_bp = Blueprint("articles", __name__, url_prefix="/articles")

# ---------------------------------------------------
# BOT STATS
# ---------------------------------------------------

@api_bp.route("/fetch-bot-stats", methods=["GET"])
def fetch_bot_stats():
    api_key = request.headers.get("X-API-KEY")

    if api_key != os.getenv("ADMIN_KEY"):
        return jsonify({"error": "Unauthorized"}), 401

    bot_stats = list(server_stats_collection.find({}, {"_id": 0}))

    return jsonify({"count": len(bot_stats)})

# ---------------------------------------------------
# ARTICLES
# ---------------------------------------------------

@article_bp.route("/fetch", methods=["GET"])
def get_articles():

    result = list(articles.find().sort("createdAt", -1))

    for r in result:
        r["_id"] = str(r["_id"])

    return jsonify(result)


@article_bp.route("/add", methods=["POST"])
def add_article():

    title = request.form.get("title")
    description = request.form.get("description")
    created_at = request.form.get("createdAt")
    link = request.form.get("link")

    image_file = request.files.get("image")

    image_url = None
    public_id = None

    if image_file:
        upload = cloudinary.uploader.upload(
            image_file,
            folder="occisor-den",
            use_filename=True
        )

        image_url = upload["secure_url"]
        public_id = upload["public_id"]

    article_data = {
        "title": title,
        "description": description,
        "createdAt": created_at,
        "image": image_url,
        "link": link,
        "public_id": public_id
    }

    inserted = articles.insert_one(article_data)

    return jsonify({
        "status": "ok",
        "id": str(inserted.inserted_id)
    })


@article_bp.route("/delete/<id>", methods=["DELETE"])
def delete_article(id):

    article = articles.find_one({"_id": ObjectId(id)})

    if not article:
        return jsonify({"error": "Article not found"}), 404

    public_id = article.get("public_id")

    if public_id:
        cloudinary.uploader.destroy(public_id)

    articles.delete_one({"_id": ObjectId(id)})

    return jsonify({"status": "deleted"})


# ---------------------------------------------------
# IMAGE UPLOAD
# ---------------------------------------------------

@api_bp.route("/upload", methods=["POST"])
def upload_image():

    file = request.files.get("image")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    result = cloudinary.uploader.upload(
        file,
        folder="occisor-den"
    )

    return jsonify({
        "url": result["secure_url"],
        "public_id": result["public_id"]
    })


# ---------------------------------------------------
# ADMIN LOGIN
# ---------------------------------------------------

@api_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    user = data.get("user")
    password = data.get("password")

    admin = admins.find_one({"user": user, "password": password})

    if not admin:
        return jsonify({"error": "Invalid credentials"}), 401

    session["admin_logged_in"] = True
    session["admin_user"] = user

    return jsonify({"status": "logged_in"})


# ---------------------------------------------------
# DISCORD OAUTH
# ---------------------------------------------------

@api_bp.route("/auth/exchange", methods=["POST"])
def exchange_code():

    data = request.json
    code = data.get("code")

    token_data = {
        "client_id": DISCORD_CLIENT_ID,
        "client_secret": DISCORD_CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": DISCORD_REDIRECT_URI,
    }

    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    token_res = requests.post(
        "https://discord.com/api/oauth2/token",
        data=token_data,
        headers=headers
    )

    token_json = token_res.json()

    access_token = token_json.get("access_token")

    session["discord_token"] = access_token

    return jsonify({"status": "ok"})


@api_bp.route("/user", methods=["GET"])
def get_user():

    token = session.get("discord_token")

    if not token:
        return jsonify({"error": "Unauthorized"}), 401

    res = requests.get(
        "https://discord.com/api/users/@me",
        headers={"Authorization": f"Bearer {token}"}
    )

    return jsonify(res.json())


# ---------------------------------------------------
# React Frontend
# ---------------------------------------------------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):

    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)

    return send_from_directory(app.static_folder, "index.html")


# ---------------------------------------------------
# Google OAuth
# ---------------------------------------------------

@app.route("/authorize")
def authorize():

    flow = Flow.from_client_secrets_file(
        GOOGLE_CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=url_for("oauth2callback", _external=True)
    )

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true"
    )

    session["state"] = state

    return redirect(authorization_url)


@app.route("/oauth2callback")
def oauth2callback():

    flow = Flow.from_client_secrets_file(
        GOOGLE_CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=url_for("oauth2callback", _external=True),
        state=session["state"]
    )

    flow.fetch_token(authorization_response=request.url)

    creds = flow.credentials

    auth_tokens_collection.update_one(
        {"service": "youtube"},
        {"$set": {"token": pickle.dumps(creds)}},
        upsert=True
    )

    return "Authorization successful."


# ---------------------------------------------------
# Run Server
# ---------------------------------------------------

def run():
    serve(app, host="0.0.0.0", port=8080)


def keep_alive():
    Thread(target=run).start()


def start_mcp():
    Thread(target=run_mcp).start()


# ---------------------------------------------------
# Blueprint Registration
# ---------------------------------------------------

api_bp.register_blueprint(article_bp)
app.register_blueprint(api_bp)