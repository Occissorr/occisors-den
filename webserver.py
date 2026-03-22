import os
import pickle
import secrets

from threading import Thread
from urllib.parse import urlparse

from flask import (
    Flask, render_template,
    send_from_directory, redirect, request, session, url_for
)

from flask_cors import CORS
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix

from waitress import serve

from google_auth_oauthlib.flow import Flow

from services import props as Bot_Props
from services.database import (
    server_stats_collection, auth_tokens_collection, admins
)
# from mcp_server.mcp_server import run_mcp

from routes import (api, articles)

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

# limiter = Limiter(
#     get_remote_address,
#     app=app,
#     default_limits=["200 per day", "50 per hour"]
# )

# ---------------------------------------------------
# Blueprints
# ---------------------------------------------------

api_bp = api.bp
article_bp = articles.bp


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
        Bot_Props.GOOGLE_CLIENT_SECRETS_FILE,
        scopes=Bot_Props.SCOPES,
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
        Bot_Props.GOOGLE_CLIENT_SECRETS_FILE,
        scopes=Bot_Props.SCOPES,
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
    port = int(os.environ.get('PORT', 8080))
    serve(app, host="0.0.0.0", port=port)


def keep_alive():
    Thread(target=run).start()


# def start_mcp():
#     Thread(target=run_mcp).start()


# ---------------------------------------------------
# Blueprint Registration
# ---------------------------------------------------

api_bp.register_blueprint(article_bp)
app.register_blueprint(api_bp)
