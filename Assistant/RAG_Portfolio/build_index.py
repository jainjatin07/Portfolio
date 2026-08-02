from config import (
    DATA_PATH,
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    VECTORSTORE_PATH,
    BM25_PATH,
)

from ingestion.loader import DocumentLoader
from ingestion.cleaner import DocumentCleaner
from ingestion.metadata import MetadataBuilder

from chunking.recursive_chunker import RecursiveChunker

from embeddings.embedding_model import EmbeddingModel

from indexing.faiss_store import FAISSStore
from indexing.bm25_store import BM25Store


# =====================================================
# DOCUMENT LOADING
# =====================================================

def build_documents():

    print("\nLoading Documents...")

    loader = DocumentLoader(DATA_PATH)
    documents = loader.load()

    print(f"Loaded {len(documents)} documents.")

    processed = []

    print("\nCleaning Documents...")

    for document in documents:

        document.page_content = DocumentCleaner.clean(
            document.page_content
        )

        if not document.page_content.strip():
            continue

        processed.append(
            MetadataBuilder.build(document)
        )

    print(f"Processed {len(processed)} valid documents.")

    return processed


# =====================================================
# CHUNKING
# =====================================================

def build_chunks(documents):

    print("\nChunking Documents...")

    chunker = RecursiveChunker(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )

    chunks = chunker.split_documents(documents)

    chunks = [
        chunk
        for chunk in chunks
        if chunk.page_content.strip()
    ]

    print(f"Generated {len(chunks)} chunks.")

    return chunks


# =====================================================
# FAISS
# =====================================================

def build_faiss(chunks, force=False):

    print("\nBuilding FAISS Index...")

    embedding_model = EmbeddingModel()

    faiss_store = FAISSStore(
        embedding_model=embedding_model,
        index_path=VECTORSTORE_PATH,
    )

    if not force and faiss_store.exists():

        print("Existing FAISS Index Found.")
        print("Loading Existing FAISS Index...")

        return faiss_store.load()

    print("Generating Embeddings...")

    vectorstore = faiss_store.build(chunks)

    print("FAISS Index Created Successfully.")

    return vectorstore


# =====================================================
# BM25
# =====================================================

def build_bm25(chunks, force=False):

    print("\nBuilding BM25 Index...")

    bm25_store = BM25Store(
        index_path=BM25_PATH
    )

    if not force and bm25_store.exists():

        print("Existing BM25 Index Found.")
        print("Loading Existing BM25 Index...")

        return bm25_store.load()

    bm25 = bm25_store.build(chunks)

    print("BM25 Index Created Successfully.")

    return bm25


# =====================================================
# MAIN
# =====================================================

def main():

    print("\n" + "=" * 80)
    print("PORTFOLIO RAG INDEX BUILDER")
    print("=" * 80)

    # Load + clean
    documents = build_documents()

    if not documents:
        print("\n❌ No valid documents found.")
        return

    # Chunk
    chunks = build_chunks(documents)

    if not chunks:
        print("\n❌ No chunks generated.")
        return

    # Build indexes
    build_faiss(chunks, force=True)

    build_bm25(chunks, force=True)

    print("\n" + "=" * 80)
    print("[OK] Indexing Completed Successfully")
    print("=" * 80)


# =====================================================
# ENTRY POINT
# =====================================================

if __name__ == "__main__":
    main()