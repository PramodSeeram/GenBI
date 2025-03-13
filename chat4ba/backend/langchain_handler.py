import openai
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv
load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set.")


openai.api_key = openai_api_key

# LangChain model setup
llm = OpenAI(temperature=0.7, openai_api_key=openai_api_key)

def generate_prompt(selected_tables, relationships, user_query):
    """
    Generate a prompt based on the selected tables, relationships, and user query.
    """

    prompt = f"""
    Given the following database schema:
    Tables: {', '.join(selected_tables)}
    Relationships: {', '.join([f'{rel["tableFrom"]}.{rel["columnFrom"]} → {rel["tableTo"]}.{rel["columnTo"]}' for rel in relationships])}
    Answer the following query: {user_query}
    """
    return prompt

def query_llm(prompt):
    """Use LangChain to send the prompt to LLM and get the response."""
    try:
       
        response = llm(prompt)
        return response
    except Exception as e:
        raise ValueError(f"Error querying LLM: {e}")
