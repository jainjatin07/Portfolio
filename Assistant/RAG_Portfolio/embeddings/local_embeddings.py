import torch

from langchain_huggingface import HuggingFaceEmbeddings

from config import LOCAL_EMBEDDING_MODEL

from embeddings.base import BaseEmbedding


class LocalEmbedding(BaseEmbedding):

    def __init__(self):

        device = "cuda" if torch.cuda.is_available() else "cpu"

        batch_size = 256 if device == "cuda" else 64

        print(f"\nEmbedding Provider : LOCAL")
        print(f"Embedding Device   : {device.upper()}")

        self.model = HuggingFaceEmbeddings(

            model_name=LOCAL_EMBEDDING_MODEL,

            model_kwargs={

                "device": device

            },

            encode_kwargs={

                "normalize_embeddings": True,

                "batch_size": batch_size

            }

        )

    def get_model(self):

        return self.model