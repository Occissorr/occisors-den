import os
from urllib.parse import urlparse, urlencode, jsonify, redirect
from flask import Blueprint, request
import requests
from webserver import session


#---------------------------------------------------
# Twitch Environment Variables
#---------------------------------------------------
TWITCH_CLIENT_ID = os.getenv("TWITCH_CLIENT_ID")
TWITCH_CLIENT_SECRET = os.getenv("TWITCH_CLIENT_SECRET")
TWITCH_REDIRECT_URI = "https://occisors-den.onrender.com/twitch/callback"


bp = Blueprint("twitch", __name__, url_prefix="/twitch")

#---------------------------------------------------
# Twitch authentication
#---------------------------------------------------
@bp.route("/authorize")
def twitch_authorize():

    current_user = session.get("user")

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    if current_user.get("role") != "admin":
        return jsonify({"error": "Forbidden"}), 403

    scopes = [
        "user:read:chat",
        "user:write:chat"
    ]

    params = {
        "client_id": TWITCH_CLIENT_ID,
        "redirect_uri": TWITCH_REDIRECT_URI,
        "response_type": "code",
        "scope": " ".join(scopes)
    }

    twitch_url = (
        "https://id.twitch.tv/oauth2/authorize?"
        + urlencode(params)
    )

    return redirect(twitch_url)



@bp.route("/callback")
def twitch_callback():
    # Check whether Twitch returned an OAuth error
    error = request.args.get("error")
    error_description = request.args.get("error_description")

    if error:
        return (
            f"Twitch authorization failed: "
            f"{error_description or error}"
        ), 400
    code = request.args.get("code")

    if not code:
        return "Missing Twitch authorization code.", 400

    # Exchange authorization code for access token
    token_response = requests.post(
        "https://id.twitch.tv/oauth2/token",
        data={
            "client_id": TWITCH_CLIENT_ID,
            "client_secret": TWITCH_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": TWITCH_REDIRECT_URI
        },
        timeout=15
    )

    if token_response.status_code != 200:
        print(
            "[Twitch OAuth] Token exchange failed:",
            token_response.text
        )
        return "Failed to obtain Twitch access token.", 500

    token_data = token_response.json()

    access_token = token_data.get("access_token")
    refresh_token = token_data.get("refresh_token")
    expires_in = token_data.get("expires_in")
    scopes = token_data.get("scope", [])

    if not access_token or not refresh_token:
        return "Twitch did not return the required tokens.", 500

    print("[Twitch OAuth] Token received successfully.")

    return "Twitch authorization successful!"

