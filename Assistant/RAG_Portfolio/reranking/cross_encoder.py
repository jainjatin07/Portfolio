from sentence_transformers import CrossEncoder


class CrossEncoderReranker:

    def __init__(
        self,
        model_name="BAAI/bge-reranker-base",
        top_k=5
    ):

        self.model = CrossEncoder(model_name)

        self.top_k = top_k

    def rerank(
        self,
        query,
        documents
    ):

        if not documents:
            return []

        pairs = [
            (query, doc.page_content)
            for doc in documents
        ]

        scores = self.model.predict(pairs)

        ranked = sorted(
            zip(scores, documents),
            key=lambda x: x[0],
            reverse=True
        )

        return [
            document
            for _, document in ranked[:self.top_k]
        ]