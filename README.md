# Generative-Pre-trained-Travel-Assistant

This is an LLM-agent that acts as a travel assistent. The application provides a chat window and a document editor. The user can interact with the chat window to chat with the assistant and can use the document editor to create a travel document, containing all information related to an upcoming trip. Based on the chat history, the LLM-agent updates (adds, removes, changes) the document. There are 1. event-based updates: the user chats with the assistant, and 2. scheduled updates: the assistant checks if the info in the document is up to date.

## How to use
1. Run the React frontend

```
cd gpta-frontend
npm start
```

2. Start the LangChain agent

```
cd agent-backend
python app.py
```

Alternative, start the Open AI inference server

```
cd gpta-backend
node server.js
```

Use the application on *http://localhost:3000*

## Structure
This repository contains three folders in its root directory:

- **agent-backend**: This folder contains a Flask app that functions as a REST-api for the application. The app contains a LangChain agent with GPT-4 as its core.

- **gpta-backend**: This folder contains an Express.js server, running on *http://localhost:5001*. The server forwards user inputs via the Open AI api and returns the response without any intermediate processing.
  
- **gpta-frontend**: This folder contains a React app that functions as the frontend of the application.


