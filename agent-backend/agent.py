import os
from dotenv import load_dotenv

from langchain_openai import OpenAI, ChatOpenAI
from langchain.agents import initialize_agent, Tool
from langchain.agents.agent_types import AgentType
from langchain.tools import BaseTool
from langchain.schema import HumanMessage, SystemMessage
from langchain.memory import ConversationBufferMemory

openai_api_key = os.getenv('OPENAI_API_KEY_s')
model = 'gpt-3.5-turbo'

llm = ChatOpenAI(openai_api_key=openai_api_key, model=model, temperature=0.7)

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)


class WeatherTool(BaseTool):
    name: str = "WeatherTool"
    description: str = "Provides weather information for a given location"

    def _run(self, query: str):
        # Simulating a weather function for the agent
        return f"The current weather in {query} is sunny with a temperature of 25°C."

    def _arun(self, query: str):
        raise NotImplementedError("This tool does not support async queries.")

class GPTTool(BaseTool):
    name: str = "GPTTool"
    description: str = "Returns a chat-based response from GPT based on the user's query"

    def _run(self, query: str):
        system_message = SystemMessage(content="You are a travel assistant that helps the user plan a trip.")
        
        response = llm([system_message] + memory.load_memory_variables({})['chat_history'] + [HumanMessage(content=query)])
        return response.content  
    def _arun(self, query: str):
        raise NotImplementedError("This tool does not support async queries.")


# agent tools
tools = [
    # Tool(
    #     name="WeatherTool",
    #     func=WeatherTool().run,
    #     description="Provides weather information for a given location"
    # ),
    Tool(
        name="GPTTool",
        func=GPTTool().run,
        description="Returns a simple response from GPT based on the user's query"
    )
]

# init langchain agent
agent = initialize_agent(tools, llm, agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION, memory=memory)

def run_agent(query: str):
    return agent.run(query)
