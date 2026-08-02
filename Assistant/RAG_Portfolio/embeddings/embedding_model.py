from langchain_mistralai import MistralAIEmbeddings

from config import MISTRAL_EMBEDDING_MODEL


class EmbeddingModel:

    _model = None

    def __init__(self):

        if EmbeddingModel._model is None:

            print("\nUsing Mistral Embeddings...")

            EmbeddingModel._model = MistralAIEmbeddings(

                model=MISTRAL_EMBEDDING_MODEL

            )

    def get_model(self):

        return EmbeddingModel._model