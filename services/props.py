import os
from dotenv import load_dotenv

# ---------------------------------------------------
# Environment Setup
# ---------------------------------------------------

load_dotenv()

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_SECRETS_FILE = "google_client_secret.json"
SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"]

DISCORD_CLIENT_ID = os.getenv("DISCORD_CLIENT_ID")
DISCORD_CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET")
DISCORD_REDIRECT_URI = os.getenv("DISCORD_REDIRECT_URI")
ADMIN_KEY = os.getenv("ADMIN_KEY")
mongo_user = os.getenv("MONGO_USER")
mongo_pass = os.getenv("MONGO_PASS")
mongo_url = os.getenv("MONGO_URL")

mongo_uri=f'mongodb+srv://{mongo_user}:{mongo_pass}{mongo_url}.mongodb.net/'