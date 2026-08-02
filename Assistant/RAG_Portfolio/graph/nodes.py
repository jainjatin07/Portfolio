from graph.state import GraphState

from llm.llm_factory import LLMFactory

from rewriting.query_rewriter import QueryRewriter

from reranking.cross_encoder import CrossEncoderReranker

from prompts.rag_prompt import RAG_PROMPT


llm = LLMFactory.create()

rewriter = QueryRewriter(llm)

reranker = CrossEncoderReranker()


def rewrite_query_node(state: GraphState):

    query = state["query"]

    rewritten_query = rewriter.rewrite(query)

    return {

        "rewritten_query": rewritten_query

    }


def retrieve_node(state: GraphState):

    retriever = state["retriever"]

    documents = retriever.retrieve(

        state["rewritten_query"]

    )

    return {

        "retrieved_documents": documents

    }


def rerank_node(state: GraphState):

    documents = reranker.rerank(

        query=state["rewritten_query"],

        documents=state["retrieved_documents"]

    )

    return {

        "reranked_documents": documents

    }


def build_context_node(state: GraphState):

    context = "\n\n".join(

        [

            document.page_content

            for document in state["reranked_documents"]

        ]

    )

    return {

        "context": context

    }


def generate_answer_node(state: GraphState):

    prompt = RAG_PROMPT.invoke(

        {

            "context": state["context"],

            "question": state["query"]

        }

    )

    response = llm.invoke(prompt)

    return {

        "response": response.content

    }