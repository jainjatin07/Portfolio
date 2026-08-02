from embeddings.embedding_model import EmbeddingModel

from indexing.faiss_store import FAISSStore

from indexing.bm25_store import BM25Store


class IndexLoader:

    def __init__(self):

        embedding = EmbeddingModel()

        self.faiss = FAISSStore(

            embedding_model=embedding

        ).load()

        self.bm25 = BM25Store().load()

    def get_faiss(self):

        return self.faiss

    def get_bm25(self):

        return self.bm25