from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import run_agent 

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Langchain Agent API!"

@app.route('/agent', methods=['POST'])
def agent_endpoint():
    data = request.json
    query = data.get('query', '')

    if not query:
        return jsonify({"error": "No query provided"}), 400

    response = run_agent(query)
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)