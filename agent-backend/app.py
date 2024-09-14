from flask import Flask, request, jsonify
from agent import run_agent 

app = Flask(__name__)

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