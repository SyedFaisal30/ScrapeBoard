from app.controller.auth_controller import verify_google_token
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/verify")

async def verify_token(token: str):
    user_data = await verify_google_token(token)
    if user_data:
        
        return { "message": "Token Verified", "user": user_data}
    raise HTTPException(status_code=401, detail="Invalid Token!")