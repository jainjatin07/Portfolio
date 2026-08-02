from pathlib import Path

from langchain_community.document_loaders import (
    PyMuPDFLoader,
    TextLoader,
    UnstructuredMarkdownLoader,
    UnstructuredWordDocumentLoader,
)

from config import SUPPORTED_FILES


class DocumentLoader:

    def __init__(self, data_path: Path):
        self.data_path = Path(data_path)

    def load(self):

        documents = []

        for file in self.data_path.iterdir():

            if file.suffix.lower() not in SUPPORTED_FILES:
                continue

            loader = self._get_loader(file)

            docs = loader.load()

            for doc in docs:

                doc.metadata["filename"] = file.name
                doc.metadata["filetype"] = file.suffix.lower()

            documents.extend(docs)

        return documents

    @staticmethod
    def _get_loader(file: Path):

        suffix = file.suffix.lower()

        if suffix == ".pdf":
            return PyMuPDFLoader(str(file))

        elif suffix == ".docx":
            return UnstructuredWordDocumentLoader(str(file))

        elif suffix == ".txt":
            return TextLoader(str(file), encoding="utf-8")

        elif suffix == ".md":
            return UnstructuredMarkdownLoader(str(file))

        raise ValueError(f"Unsupported file: {file}")