import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from config import GEMINI_MODEL, TEMPERATURE

load_dotenv()

class GeminiLLM:
    _llm = None

    def __init__(self):
        if GeminiLLM._llm is None:
            api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
            GeminiLLM._llm = ChatGoogleGenerativeAI(
                model=GEMINI_MODEL,
                temperature=TEMPERATURE,
                google_api_key=api_key
            )

    def get_llm(self):
        return GeminiLLM._llm
