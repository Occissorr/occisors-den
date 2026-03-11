from flask import Blueprint, jsonify, request, session
import requests
import cloudinary
import cloudinary.uploader

from services.database import server_stats_collection, auth_tokens_collection, admins
from services import props

bp = Blueprint("api", __name__, url_prefix="/api")

# ---------------------------------------------------
# BOT STATS
# ---------------------------------------------------

@bp.route("/fetch-bot-stats", methods=["GET"])
def fetch_bot_stats():
    api_key = request.headers.get("X-API-KEY")

    if api_key != props.ADMIN_KEY:
        return jsonify({"error": "Unauthorized"}), 401

    bot_stats = list(server_stats_collection.find({}, {"_id": 0}))

    return jsonify({"count": len(bot_stats)})

# ---------------------------------------------------
# IMAGE UPLOAD
# ---------------------------------------------------

@bp.route("/upload", methods=["POST"])
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

@bp.route("/login", methods=["POST"])
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

@bp.route("/auth/exchange", methods=["POST"])
def exchange_code():

    data = request.json
    code = data.get("code")

    token_data = {
        "client_id": props.DISCORD_CLIENT_ID,
        "client_secret": props.DISCORD_CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": props.DISCORD_REDIRECT_URI,
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


@bp.route("/user", methods=["GET"])
def get_user():

    token = session.get("discord_token")

    if not token:
        return jsonify({"error": "Unauthorized"}), 401

    res = requests.get(
        "https://discord.com/api/users/@me",
        headers={"Authorization": f"Bearer {token}"}
    )

    return jsonify(res.json())
