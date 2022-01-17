#!/usr/bin/env python3

from flask import Flask, request, jsonify
from main import to_tangle
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])

@app.route("/", methods=['POST'])
def totangle():
    tmp = request.json
    return { "result": to_tangle(tmp['pa']) }

def main():
    app.run()

if __name__ == "__main__":
    main()