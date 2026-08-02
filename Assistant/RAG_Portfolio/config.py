import os
from dotenv import load_dotenv

load_dotenv()

# ===========================
# Paths
# ===========================

DATA_PATH = "data"

VECTORSTORE_PATH = "vectorstore"

BM25_PATH = "bm25_store"

# ===========================
# Embeddings
# ===========================

MISTRAL_EMBEDDING_MODEL = "mistral-embed"

# ===========================
# Reranker
# ===========================

RERANKER_MODEL = "cross-encoder/ms-marco-MiniLM-L-6-v2"

# ===========================
# LLM
# ===========================

MISTRAL_MODEL = "codestral-2508"

TEMPERATURE = 0.0

# ===========================
# Retrieval
# ===========================

TOP_K = 30

FINAL_K = 20

# ===========================
# Chunking
# ===========================

CHUNK_SIZE = 1600

CHUNK_OVERLAP = 300

# ===========================
# Supported Files
# ===========================

SUPPORTED_FILES = [
    ".pdf",
    ".txt",
    ".docx"
]