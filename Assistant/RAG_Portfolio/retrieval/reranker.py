class Reranker:
    _model = None

    def __init__(self):
        pass

    def rerank(self, query, documents, top_k=10):
        if not documents:
            return []
            
        try:
            from sentence_transformers import CrossEncoder
            from config import RERANKER_MODEL
            if Reranker._model is None:
                Reranker._model = CrossEncoder(RERANKER_MODEL)
            pairs = [(query, doc.page_content) for doc in documents]
            scores = Reranker._model.predict(pairs)
            ranked = sorted(zip(scores, documents), key=lambda x: x[0], reverse=True)
            return [doc for _, doc in ranked[:top_k]]
        except Exception:
            # Fallback to Reciprocal Rank Fusion (RRF) top documents
            return documents[:top_k]