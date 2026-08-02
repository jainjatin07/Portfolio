import os
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from config import MISTRAL_MODEL, TEMPERATURE

load_dotenv()

class MistralLLM:
    _llm = None

    def __init__(self):
        if MistralLLM._llm is None:
            api_key = os.getenv("MISTRAL_API_KEY")
            MistralLLM._llm = ChatMistralAI(
                model=MISTRAL_MODEL,
                temperature=TEMPERATURE,
                api_key=api_key
            )

    def get_llm(self):
        return MistralLLM._llm
