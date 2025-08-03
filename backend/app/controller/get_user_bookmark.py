from fastapi import HTTPException, status
from pymongo.errors import PyMongoError
from app.utils.dbConnect import bookmarks_collection

async def get_user_bookmarks(email: str):
    try:
        cursor = bookmarks_collection.find({"email": email})
        documents = await cursor.to_list(length=100)

        # Convert ObjectId to str in each document
        for doc in documents:
            doc["_id"] = str(doc["_id"])

        return {"bookmarks": documents}

    except PyMongoError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )
