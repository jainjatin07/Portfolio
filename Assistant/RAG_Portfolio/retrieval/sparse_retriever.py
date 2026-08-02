import numpy as np


class SparseRetriever:

    def __init__(

        self,

        bm25,

        k=20

    ):

        self.bm25 = bm25["bm25"]

        self.documents = bm25["documents"]

        self.k = k

    def retrieve(

        self,

        query

    ):

        scores = self.bm25.get_scores(

            query.lower().split()

        )

        indices = np.argsort(scores)[::-1]

        return [

            self.documents[i]

            for i in indices[:self.k]

        ]