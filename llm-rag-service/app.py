from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_chain import build_rag_chain
import json

app = Flask(__name__)
CORS(app)

@app.route("/api/ask", methods=["POST"])
def ask_api():
    data = request.get_json()

    latestSummary = data.get("latestSummary", None)
    logs = data.get("logs", None)
    question = data.get("question", None)

    # Log everything first
    print("\nReceived data:")
    print("Question:", question)
    print("latestSummary type:", type(latestSummary))
    print("latestSummary preview:", str(latestSummary)[:100])  # Preview first 100 chars
    print("Logs type:", type(logs))
    print("Logs count:", len(logs) if logs else 0)

    # Check inputs explicitly
    if latestSummary is None:
        return jsonify({"error": "Swagger is missing"}), 400
    if logs is None:
        return jsonify({"error": "Logs are missing"}), 400
    if question is None:
        return jsonify({"error": "Question is missing"}), 400

    try:
        # Parse swagger string into dict if needed
        if isinstance(latestSummary, str):
            swagger = json.loads(swagger)

        chain = build_rag_chain(latestSummary, logs)
        answer = chain.run(question + "make it consise and in point format")
        return jsonify({"answer": answer})

    except Exception as e:
        print("Exception occurred:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=8000)
