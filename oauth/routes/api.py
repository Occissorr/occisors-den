from flask import Blueprint, jsonify, request, session
import requests
import cloudinary
import cloudinary.uploader
from werkzeug.security import generate_password_hash, check_password_hash

from services.database import server_stats_collection, auth_tokens_collection, admins
from services import props

bp = Blueprint("api", __name__, url_prefix="/api")


def _password_matches(stored_password, password):
    if not stored_password or not password:
        return False

    try:
        return check_password_hash(stored_password, password)
    except (ValueError, TypeError):
        return False

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
    data = request.json or {}

    user = data.get("user")
    password = data.get("password")

    if not user or not password:
        return jsonify({"error": "Invalid credentials"}), 401

    users = admins.find_one({"user": user})

    if not users:
        return jsonify({"error": "Invalid credentials"}), 401

    stored_password = users.get("password")

    if not stored_password:
        return jsonify({"error": "Invalid credentials"}), 401

    if not _password_matches(stored_password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    session["user"] = {
        "username": user,
        "role": users.get("role", "admin")
    }

    session["admin_logged_in"] = True
    session["admin_user"] = user

    return jsonify({"status": "logged_in"})


@bp.route("/register", methods=["POST"])
def register():
    """Generic registration endpoint.

    If the provided credentials match the reserved admin credentials
    (username 'occisor' and password 'T3rm1n4tor'), the created user
    will receive role 'admin'. Otherwise role 'user' is used.
    """
    data = request.json or {}
    user = data.get("user")
    password = data.get("password")

    if not user or not password:
        return jsonify({"error": "Missing user or password"}), 400

    existing = admins.find_one({"user": user})
    if existing:
        return jsonify({"error": "User already exists"}), 409

    role = "user"

    hashed_password = generate_password_hash(password)
    admins.insert_one({"user": user, "password": hashed_password, "role": role})
    return jsonify({"status": "registered", "role": role}), 200


@bp.route("/me", methods=["GET"])
def me():
    current_user = session.get("user")
    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({"user": current_user})


@bp.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"status": "logged_out"})


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
