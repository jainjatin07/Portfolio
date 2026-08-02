from llm.groq_llm import GroqLLM


class LLMFactory:

    @staticmethod
    def create():

        return GroqLLM().get_llm()