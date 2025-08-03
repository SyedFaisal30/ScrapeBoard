from pydantic import BaseModel, EmailStr
from typing import Dict, Any

class BookmarkRequest(BaseModel):
    email: EmailStr
    headline: str
    url: str
    img_url: str

    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "haedline": "AI set to transform tech jobs",
                "url": "https://example.com/news/ai-jobs",
                "img_url": "https://example.com/images/ai.jpg",
                }
            }
