import json
from flask import Flask, request
app = Flask(__name__)

@app.route("/view/gazo.html", methods=["GET", "POST"])
def up():
    if request.method == "POST":
        f = request.files["file"]
        