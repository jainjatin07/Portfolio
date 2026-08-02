from pathlib import Path
from hashlib import sha256
from datetime import datetime


class MetadataBuilder:

    @staticmethod
    def build(document):

        source = Path(document.metadata.get("source", ""))

        text = document.page_content

        document.metadata.update({

            "document_id": sha256(
                str(source).encode("utf-8")
            ).hexdigest(),

            "chunk_id": None,

            "source": str(source),

            "file_name": source.name,

            "file_type": source.suffix.lower(),

            "page": document.metadata.get("page", 0),

            "char_count": len(text),

            "word_count": len(text.split()),

            "text_hash": sha256(
                text.encode("utf-8")
            ).hexdigest(),

            "indexed_at": datetime.utcnow().isoformat(),

            "last_modified": (
                datetime.fromtimestamp(source.stat().st_mtime).isoformat()
                if source.exists()
                else None
            ),

        })

        return document