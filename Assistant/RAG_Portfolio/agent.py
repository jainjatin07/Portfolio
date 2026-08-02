from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict, Annotated

from speech import speech_to_text

from llm.mistral_llm import MistralLLM
from langchain_core.messages import AIMessage
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph, START, END

from retrieval.load_indexes import IndexLoader
from retrieval.hybrid_retriever import HybridRetriever
from generation.context_builder import ContextBuilder


# =====================================================
# Load Hybrid RAG
# =====================================================

print("\nLoading Hybrid Retrieval Pipeline...")

indexes = IndexLoader()

hybrid_retriever = HybridRetriever(

    faiss_store=indexes.get_faiss(),

    bm25_store=indexes.get_bm25(),

    top_k=20

)

print("Hybrid Retriever Ready.")

# =====================================================
# LLM
# =====================================================

llm = MistralLLM().get_llm()


# =====================================================
# LangGraph State
# =====================================================

class State(TypedDict):

    query_type: str

    messages: Annotated[list, add_messages]

    retrieved_context: str

    rewritten_query: str

def get_conversation(state: State, limit=6):

    history = state["messages"][-limit:]

    conversation = "\n".join(
        f"{msg.type}: {msg.content}"
        for msg in history
    )

    return conversation

# =====================================================
# Classifier Node
# =====================================================

def classifier_node(state: State):

    conversation = get_conversation(state)

    latest_query = state["messages"][-1].content

    prompt = f"""
You are an intelligent routing classifier for Jatin Jain's
personal AI portfolio assistant.

The assistant has access to an indexed knowledge base containing
information about Jatin Jain, including his:

- academic history
- semester results
- GPA / CGPA
- education
- subjects
- coursework
- technical skills
- projects
- internships
- certifications
- achievements
- experience
- technologies
- professional profile
- career information
- portfolio information

Your task is to route the LAST user message to exactly one of:

RAG
OUT_OF_SCOPE


==================================================
ROUTE TO RAG
==================================================

Choose RAG whenever the user appears to be asking about information
that could belong to Jatin Jain's portfolio or indexed documents.

The user does NOT need to explicitly mention:

"Jatin"
"Jatin Jain"
"portfolio"
"resume"
"document"

For example, ALL of these should be RAG:

"What is his 8th semester CGPA?"
"What is the 8th semester CGPA?"
"8 sem cgpa"
"Tell me his achievements"
"What are his achievements?"
"Achievements"
"What projects has he built?"
"Tell me about the AQI project"
"What are his technical skills?"
"Which technologies does he know?"
"What internship did he do?"
"Tell me about his education"
"What subjects did he study?"
"What certifications does he have?"
"What is his academic performance?"
"What was his highest SGPA?"
"Which semester was his best?"
"Tell me about the attendance project"
"His experience"
"His skills"
"His projects"

Short, incomplete, keyword-style queries should still be routed
to RAG when they appear related to the portfolio.

Examples:

"8 sem cgpa" -> RAG
"achievements" -> RAG
"projects" -> RAG
"internship" -> RAG
"certifications" -> RAG
"technical skills" -> RAG
"education" -> RAG
"semester 5" -> RAG


==================================================
ROUTE TO OUT_OF_SCOPE
==================================================

Choose OUT_OF_SCOPE when the question is clearly unrelated to Jatin Jain's professional portfolio, background, projects, skills, education, experience, certifications, achievements, or career information.

Examples:

"Who is Virat Kohli?" -> OUT_OF_SCOPE
"Who is Narendra Modi?" -> OUT_OF_SCOPE
"What is machine learning?" -> OUT_OF_SCOPE
"Explain RAG" -> OUT_OF_SCOPE
"What is Python?" -> OUT_OF_SCOPE
"How does FAISS work?" -> OUT_OF_SCOPE
"What is the capital of India?" -> OUT_OF_SCOPE
"Write a Python program" -> OUT_OF_SCOPE


==================================================
CONVERSATIONAL FOLLOW-UPS
==================================================

Use conversation history to resolve references such as:

he
his
him
it
this
that
they
them
those
the project
the previous project
that semester
that internship
the previous one

If the conversation is already discussing information retrieved
from Jatin Jain's portfolio, follow-up questions about that topic
should continue to use RAG.

Example:

User: "What projects has Jatin built?"
Assistant: "AQI Predictor, Smart Attendance..."
User: "Explain the second one."

Route:
RAG


==================================================
IMPORTANT
==================================================

Do not answer the user's question.

Only classify it.

When uncertain between RAG and OUT_OF_SCOPE, prefer RAG if the query
could reasonably refer to Jatin Jain's academic, professional,
project, skill, achievement, or portfolio information.

Conversation:

{conversation}

Latest user message:

{latest_query}

Return EXACTLY one word:

RAG

or

OUT_OF_SCOPE
"""

    response = llm.invoke(prompt)

    label = response.content.strip().upper()

    if label not in ["RAG", "OUT_OF_SCOPE"]:
        label = "OUT_OF_SCOPE"

    print(f"\nRoute: {label}")

    return {
        "query_type": label
    }
# =====================================================
# RAG Node
# =====================================================

def rag_node(state: State):

    query = state["messages"][-1].content

    conversation = get_conversation(state)

    rewrite_prompt = f"""
You are an intelligent query rewriting engine for Jatin Jain's portfolio RAG assistant.

Your task is to rewrite the LAST user message into an enriched, comprehensive, standalone search query for document retrieval.

Use the conversation history and your knowledge of Jatin Jain's portfolio to:
1. Resolve missing context, pronouns (he, his, him, it, this, that), and follow-up references.
2. Expand short, keyword-style queries (e.g., "sem 1", "achievements", "certifications", "10th marks") into clear, descriptive search queries grounded in Jatin Jain's academic records, technical skills, projects, and documents.
3. Keep the rewritten query focused and relevant to searching Jatin Jain's indexed portfolio documents.

Do NOT answer the question.
Return ONLY the rewritten search query.

Conversation:

{conversation}

Latest message:

{query}

Standalone Search Query:
"""

    try:
        rewritten = llm.invoke(rewrite_prompt).content.strip().replace('"', '')
    except Exception:
        rewritten = query

    print(f"\nOriginal Query : {query}")
    print(f"Search Query   : {rewritten}")

    print("\nSearching Documents...")

    documents = hybrid_retriever.retrieve(
        rewritten
    )

    context = ContextBuilder.build(
        documents
    )

    return {
        "retrieved_context": context,
        "rewritten_query": rewritten
    }

# =====================================================
# Out-of-Scope Node
# =====================================================
def out_of_scope_node(state: State):

    return {
        "retrieved_context": "OUT_OF_SCOPE"
    }


# =====================================================
# Response Node
# =====================================================


def response_node(state: State):

    query = state["messages"][-1].content

    context = state["retrieved_context"]

    conversation = get_conversation(state)

    # ==============================
    # OUT-OF-SCOPE RESPONSE
    # ==============================

    if context == "OUT_OF_SCOPE":

        return {
            "messages": [
                AIMessage(
                    content=(
                        "Hello! I’m Jatin Jain’s AI Portfolio Assistant. "
                        "I’m designed to provide information about Jatin’s professional profile, "
                        "including his projects, technical skills, experience, education, "
                        "internships, certifications, achievements, and technologies. "
                        "Please feel free to ask me anything related to his professional background or portfolio."
                    )
                )
            ]
        }

    # ==============================
    # RAG RESPONSE
    # ==============================

    else:

        prompt = f"""You are Jatin Jain's Personal AI Portfolio Assistant.

Answer the user's question accurately using ONLY the supplied DOCUMENT CONTEXT.

CRITICAL RESPONSE FORMATTING GUIDELINES:
1. EXECUTIVE SUMMARY: Start with a brief, polished 1-2 sentence overview answering the user directly.
2. HEADINGS & SUBHEADINGS: Structure your answer using clear Markdown headings (e.g., `## Section Title`, `### Sub-Category`).
3. COMPLETE LISTINGS: Include ALL matching items (certificates, projects, technical skills, achievements) present in the context without omitting any.
4. CLICKABLE MARKDOWN LINKS: For every certificate or document link in the context, format it as a markdown hyperlink (e.g., `[View Certificate](URL)`).
5. EXACT URLs: Copy the exact URL from the context character-for-character. Do NOT alter, modify, or swap any URLs.
6. ELEGANT BULLET POINTS: Use bold text for titles (`**Item Name**`) followed by concise details. Keep the tone minimal, executive, and highly professional.

Conversation:

{conversation}

----------------------------
DOCUMENT CONTEXT
----------------------------

{context}

----------------------------

Latest Question:

{query}

Answer:
"""

    response = llm.invoke(prompt)

    return {
        "messages": [
            AIMessage(
                content=response.content
            )
        ]
    }

# =====================================================
# Router
# =====================================================

def router_function(state: State):

    if state["query_type"] == "RAG":

        return "rag_node"

    return "out_of_scope_node"

# =====================================================
# LangGraph
# =====================================================

graph = StateGraph(State)

graph.add_node(

    "classifier_node",

    classifier_node

)

graph.add_node(

    "rag_node",

    rag_node

)

graph.add_node(

    "out_of_scope_node",

    out_of_scope_node

)

graph.add_node(

    "response_node",

    response_node

)

graph.add_edge(

    START,

    "classifier_node"

)

graph.add_conditional_edges(

    "classifier_node",

    router_function,

    {

        "rag_node": "rag_node",

        "out_of_scope_node": "out_of_scope_node",

    }

)

graph.add_edge(

    "rag_node",

    "response_node"

)

graph.add_edge(

    "out_of_scope_node",

    "response_node"

)

graph.add_edge(

    "response_node",

    END

)

memory = MemorySaver()

app = graph.compile(checkpointer=memory)

print("\n==============================================")
print("Production Hybrid RAG Assistant Ready")
print("==============================================")

# =====================================================
# Chat Loop
# =====================================================
if __name__ == "__main__":
    thread_config = {
        "configurable": {
            "thread_id": "chat-1"
        }
    }

    while True:

        print("\n1. Text")

        print("2. Voice")

        print("3. Exit")

        choice = input("\n> ")

        if choice == "1":

            user_input = input("\nYou : ")

        elif choice == "2":

            user_input = speech_to_text()

            print("\nYou :", user_input)

        elif choice == "3":

            break

        else:

            print("Invalid Choice")

            continue

        print("\nThinking...")

        result = app.invoke(
            {
                "messages": [
                    (
                        "user",
                        user_input
                    )
                ]
            },
            config=thread_config
        )

        print("\nAssistant:\n")
        print(
            result["messages"][-1].content
        )