from langchain_core.prompts import ChatPromptTemplate

from rewriting.prompts import QUERY_REWRITE_PROMPT


class QueryRewriter:

    def __init__(self, llm):

        self.llm = llm

        self.prompt = ChatPromptTemplate.from_template(
            QUERY_REWRITE_PROMPT
        )

    def rewrite(self, query):

        messages = self.prompt.format_messages(
            query=query
        )

        response = self.llm.invoke(messages)

        return response.content.strip()