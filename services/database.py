
from pymongo import MongoClient, server_api
from services import props as Bot_Props
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    logger.info("✅ Connected to MongoDB")
except Exception as e:
    logger.error("❌ MongoDB connection error:", e)


def initialize_database():
    try:
        server_stats_collection.create_index("server_id", unique=True)
        logger.info("Database initialized")
    except Exception as e:
        logger.error("DB init error:", e)
        