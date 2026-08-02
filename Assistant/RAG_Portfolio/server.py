import os
import sys

# Ensure current directory is in python search path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import app

api = FastAPI(title="Jatin Jain Portfolio RAG Assistant API")

# Enable CORS for frontend connection (port 5173 / localhost)
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    thread_id: str = "chat-1"

@api.post("/api/chat")
async def chat(req: ChatRequest):
    user_input = req.message
    if not user_input or not user_input.strip():
        return {
            "reply": "Please provide a message.",
            "response": "Please provide a message.",
            "query_type": "OUT_OF_SCOPE"
        }
    
    config = {
        "configurable": {
            "thread_id": req.thread_id
        }
    }
    
    result = app.invoke(
        {"messages": [("user", user_input)]},
        config=config
    )
    
    reply = result["messages"][-1].content
    query_type = result.get("query_type", "RAG")
    
    return {
        "reply": reply,
        "response": reply,
        "query_type": query_type
    }

@api.get("/")
async def root():
    return {"status": "ok", "message": "Jatin Jain Portfolio Assistant API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(api, host="0.0.0.0", port=8000)
