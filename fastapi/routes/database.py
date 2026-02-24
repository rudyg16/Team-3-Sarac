from fastapi import APIRouter
from pymongo import MongoClient
import os 
from dotenv import load_dotenv
from pathlib import Path
env_path = Path(__file__).resolve().parent.parent / ".env"

load_dotenv(dotenv_path=env_path)

#env vars
mongo_root = os.getenv("MONGO_ROOT_USERNAME")
mongo_root_pass = os.getenv("MONGO_ROOT_PASSWORD")
mongo_name = os.getenv("MONGO_DATABASE")

qdrant_key = os.getenv("QDRANT_API_KEY")

client = MongoClient(f"mongodb://{mongo_root}:{mongo_root_pass}@localhost:27017/admin")
db = client[mongo_name]

try:
    client.admin.command("ping")
    print("success")
except Exception as e:
    print(e)
    print("fail")
