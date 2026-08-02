from typing import Any, List, TypedDict

from langchain_core.documents import Document


class GraphState(TypedDict):
    """
    Shared state passed between all LangGraph nodes.
    """

    # Original user query
    query: str

    # Query after rewriting
    rewritten_query: str

    # Hybrid Retriever instance
    retriever: Any

    # Documents returned by Hybrid Retrieval
    retrieved_documents: List[Document]

    # Documents after Cross Encoder reranking
    reranked_documents: List[Document]

    # Final context sent to the LLM
    context: str

    # Final generated answer
    response: str