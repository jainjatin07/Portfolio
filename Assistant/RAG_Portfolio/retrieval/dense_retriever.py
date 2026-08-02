class DenseRetriever:

    def __init__(

        self,

        vectorstore,

        k=20

    ):

        self.vectorstore = vectorstore

        self.k = k

    def retrieve(

        self,

        query

    ):

        return self.vectorstore.similarity_search(

            query,

            k=self.k

        )