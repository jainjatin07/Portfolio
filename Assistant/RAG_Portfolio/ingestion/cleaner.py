import re
import unicodedata


class DocumentCleaner:

    @staticmethod
    def clean(text: str) -> str:
        """
        Clean extracted document text.
        """

        if not text:
            return ""

        # Normalize unicode characters
        text = unicodedata.normalize("NFKC", text)

        # Remove null bytes
        text = text.replace("\x00", "")

        # Normalize line endings
        text = text.replace("\r\n", "\n")
        text = text.replace("\r", "\n")

        # Replace tabs with spaces
        text = text.replace("\t", " ")

        # Remove multiple spaces
        text = re.sub(r"[ ]{2,}", " ", text)

        # Remove excessive blank lines
        text = re.sub(r"\n{3,}", "\n\n", text)

        # Remove trailing spaces
        text = re.sub(r" +\n", "\n", text)

        # Strip leading/trailing whitespace
        text = text.strip()

        return text