from langchain_core.documents import Document


class ContextBuilder:

    @staticmethod
    def build(documents):

        contexts = []

        for i, document in enumerate(documents, start=1):

            source = document.metadata.get(

                "file_name",

                "Unknown"

            )

            page = document.metadata.get(

                "page",

                "-"

            )

            contexts.append(

                f"""
Document {i}

Source : {source}

Page : {page}

Content:

{document.page_content}
"""

            )

        return "\n\n".join(contexts)