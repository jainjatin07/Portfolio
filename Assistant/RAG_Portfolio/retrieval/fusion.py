from collections import defaultdict


class ReciprocalRankFusion:

    def __init__(self, k=60):

        self.k = k

    def fuse(self, rankings):

        scores = defaultdict(float)

        documents = {}

        for ranking in rankings:

            for rank, document in enumerate(

                ranking,

                start=1

            ):

                chunk_id = document.metadata["chunk_id"]

                documents[chunk_id] = document

                scores[chunk_id] += 1 / (

                    self.k + rank

                )

        ranked = sorted(

            scores.items(),

            key=lambda x: x[1],

            reverse=True

        )

        return [

            documents[chunk_id]

            for chunk_id, _ in ranked

        ]