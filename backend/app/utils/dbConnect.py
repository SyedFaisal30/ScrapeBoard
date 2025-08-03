from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in environment variables.")

client = AsyncIOMotorClient(MONGO_URI)

db_name = MONGO_URI.split("/")[-1].split("?")[0]
db = client[db_name]

bookmarks_collection = db["bookmarks"]
