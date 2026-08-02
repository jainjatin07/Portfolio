from config import EMBEDDING_PROVIDER

from embeddings.local_embeddings import LocalEmbedding
from embeddings.mistral_embeddings import MistralEmbedding


class EmbeddingFactory:

    @staticmethod
    def create():

        provider = EMBEDDING_PROVIDER.lower()

        if provider == "local":

            return LocalEmbedding()

        elif provider == "mistral":

            return MistralEmbedding()

        raise ValueError(

            f"Unknown Embedding Provider: {provider}"

        )