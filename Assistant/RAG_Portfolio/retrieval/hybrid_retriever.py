from retrieval.dense_retriever import DenseRetriever

from retrieval.sparse_retriever import SparseRetriever

from retrieval.fusion import ReciprocalRankFusion

from retrieval.reranker import Reranker


class HybridRetriever:

    def __init__(

        self,

        faiss_store,

        bm25_store,

        top_k=20,

    ):

        self.dense = DenseRetriever(

            faiss_store,

            top_k

        )

        self.sparse = SparseRetriever(

            bm25_store,

            top_k

        )

        self.fusion = ReciprocalRankFusion()

        self.reranker = Reranker()

    def retrieve(

        self,

        query

    ):

        dense = self.dense.retrieve(

            query

        )

        sparse = self.sparse.retrieve(

            query

        )

        fused = self.fusion.fuse(

            [

                dense,

                sparse

            ]

        )

        reranked = self.reranker.rerank(

            query,

            fused,

            top_k=5

        )

        return reranked