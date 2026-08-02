import pickle
from pathlib import Path

from rank_bm25 import BM25Okapi


class BM25Store:

    def __init__(self, index_path="bm25_store"):

        self.index_path = Path(index_path)

    @staticmethod
    def preprocess(text: str):

        return text.lower().split()

    def exists(self):

        return (

            self.index_path.exists()

            and

            (self.index_path / "bm25.pkl").exists()

        )

    def build(self, chunks):

        print("\nBuilding BM25 Index...")

        corpus = [

            self.preprocess(chunk.page_content)

            for chunk in chunks

        ]

        bm25 = BM25Okapi(corpus)

        payload = {

            "bm25": bm25,

            "documents": chunks

        }

        self.index_path.mkdir(

            parents=True,

            exist_ok=True

        )

        with open(

            self.index_path / "bm25.pkl",

            "wb"

        ) as f:

            pickle.dump(payload, f)

        return payload

    def load(self):

        print("\nLoading Existing BM25 Index...")

        with open(

            self.index_path / "bm25.pkl",

            "rb"

        ) as f:

            return pickle.load(f)