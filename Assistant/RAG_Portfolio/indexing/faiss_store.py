from pathlib import Path

from tqdm import tqdm

from langchain_community.vectorstores import FAISS


class FAISSStore:

    def __init__(

        self,

        embedding_model,

        index_path="vectorstore",

    ):

        self.embedding_model = embedding_model.get_model()

        self.index_path = Path(index_path)

    def exists(self):

        return (

            self.index_path.exists()

            and

            (self.index_path / "index.faiss").exists()

        )

    def build(

        self,

        chunks,

        batch_size=256

    ):

        print("\nGenerating Embeddings...")

        texts = [

            chunk.page_content

            for chunk in chunks

        ]

        metadatas = [

            chunk.metadata

            for chunk in chunks

        ]

        embeddings = []

        all_texts = []

        all_metadata = []

        for start in tqdm(

            range(0, len(texts), batch_size),

            desc="Embedding"

        ):

            batch_texts = texts[start:start + batch_size]

            batch_metadata = metadatas[start:start + batch_size]

            batch_embeddings = self.embedding_model.embed_documents(

                batch_texts

            )

            embeddings.extend(batch_embeddings)

            all_texts.extend(batch_texts)

            all_metadata.extend(batch_metadata)

        text_embedding_pairs = list(

            zip(

                all_texts,

                embeddings

            )

        )

        vectorstore = FAISS.from_embeddings(

            text_embeddings=text_embedding_pairs,

            embedding=self.embedding_model,

            metadatas=all_metadata

        )

        self.index_path.mkdir(

            parents=True,

            exist_ok=True

        )

        vectorstore.save_local(

            str(self.index_path)

        )

        return vectorstore

    def load(self):

        return FAISS.load_local(

            folder_path=str(self.index_path),

            embeddings=self.embedding_model,

            allow_dangerous_deserialization=True

        )