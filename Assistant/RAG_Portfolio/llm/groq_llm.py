import os

from dotenv import load_dotenv

load_dotenv()

from langchain_groq import ChatGroq

from config import (

    GROQ_MODEL,

    TEMPERATURE

)


class GroqLLM:

    _llm = None

    def __init__(self):

        if GroqLLM._llm is None:

            GroqLLM._llm = ChatGroq(

                model=GROQ_MODEL,

                temperature=TEMPERATURE,

                api_key=os.getenv(

                    "GROQ_API_KEY"

                )

            )

    def get_llm(self):

        return GroqLLM._llm