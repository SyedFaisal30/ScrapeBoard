import httpx
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

async def verify_google_token(token: str):
    url = f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            data = response.json()
            print("Received aud:", data["aud"])
            print("Expected aud:", GOOGLE_CLIENT_ID)

            if data["aud"] == GOOGLE_CLIENT_ID:
                return {
                    "email": data["email"],
                    "name": data["name"],
                    "picture": data["picture"]
                }
    return None