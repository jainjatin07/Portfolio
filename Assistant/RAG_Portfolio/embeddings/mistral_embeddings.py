from langchain_mistralai import MistralAIEmbeddings

from config import MISTRAL_EMBEDDING_MODEL

from embeddings.base import BaseEmbedding


class MistralEmbedding(BaseEmbedding):

    def __init__(self):

        print("\nEmbedding Provider : MISTRAL")

        self.model = MistralAIEmbeddings(

            model=MISTRAL_EMBEDDING_MODEL

        )

    def get_model(self):

        return self.model