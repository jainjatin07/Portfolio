from sentence_transformers import CrossEncoder

from config import RERANKER_MODEL


class Reranker:

    _model = None

    def __init__(self):

        if Reranker._model is None:

            print("\nLoading Cross Encoder...")

            Reranker._model = CrossEncoder(

                RERANKER_MODEL

            )

    def rerank(

        self,

        query,

        documents,

        top_k=10

    ):

        if not documents:

            return []

        pairs = [

            (

                query,

                document.page_content

            )

            for document in documents

        ]

        scores = Reranker._model.predict(

            pairs

        )

        ranked = sorted(

            zip(

                scores,

                documents

            ),

            key=lambda x: x[0],

            reverse=True

        )

        return [

            document

            for _, document in ranked[:top_k]

        ]