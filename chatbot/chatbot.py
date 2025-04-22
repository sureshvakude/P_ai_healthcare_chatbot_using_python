import numpy
import tflearn
import tensorflow
import random
import json
import nltk
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

nltk.download('punkt')
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

app = Flask(__name__)
CORS(app, origins="https://ai-healthcare-chatbot-using-python.vercel.app", supports_credentials=True)

# Load intents
with open('intents.json') as file:
    data = json.load(file)

# Preprocessing
words, labels, docs_x, docs_y = [], [], [], []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        wrds = nltk.word_tokenize(pattern)
        words.extend(wrds)
        docs_x.append(wrds)
        docs_y.append(intent["tag"])
    if intent["tag"] not in labels:
        labels.append(intent["tag"])

words = sorted(list(set(stemmer.stem(w.lower()) for w in words if w != "?")))
labels = sorted(labels)

training, output = [], []
out_empty = [0 for _ in range(len(labels))]

for x, doc in enumerate(docs_x):
    bag = [1 if stemmer.stem(w) in [stemmer.stem(word) for word in doc] else 0 for w in words]
    output_row = out_empty[:]
    output_row[labels.index(docs_y[x])] = 1
    training.append(bag)
    output.append(output_row)

training = numpy.array(training)
output = numpy.array(output)

# Build model once
tensorflow.compat.v1.reset_default_graph()
net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)
model = tflearn.DNN(net)

# Load or train the model once at startup
MODEL_FILE = "model.tflearn"
if os.path.exists(MODEL_FILE):
    print("Loading model...")
    model.load(MODEL_FILE)
else:
    print("Training model...")
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save(MODEL_FILE)

# Utility
def bag_of_words(s, words):
    bag = [0] * len(words)
    s_words = [stemmer.stem(word.lower()) for word in nltk.word_tokenize(s)]
    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return numpy.array(bag)

slist = ["hii", "hiii", "hi"]

def chat(msg):
    if msg.lower() == "quit":
        return "Thank you!"
    if msg.lower() in slist:
        return "Hii..how can I help you sir?"
    results = model.predict([bag_of_words(msg, words)])[0]
    results_index = numpy.argmax(results)
    tag = labels[results_index]
    if results[results_index] > 0.5:
        for tg in data["intents"]:
            if tg['tag'] == tag:
                return random.choice(tg['responses'])
    return "I didn't get that, try again."

# API Routes
@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat_endpoint():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    data = request.get_json()
    msg = data.get("message", "")
    if not msg:
        return jsonify({"response": "Please provide a message"}), 400
    response = chat(msg)
    return jsonify({"response": response})

# Email Credentials (replace with secure method in production)
EMAIL_USER = "vvitproject1234@gmail.com"
EMAIL_PASS = "culr gzbv tstb nyrv"

def send_email(to, subject, message):
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = to
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, to, msg.as_string())
        server.quit()
        return True, "Email sent successfully!"
    except Exception as e:
        return False, str(e)

@app.route('/send_email', methods=['POST', 'OPTIONS'])
def send_email_api():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    data = request.get_json()
    to, subject, message = data.get('to'), data.get('subject'), data.get('message')
    if not to or not subject or not message:
        return jsonify({"success": False, "message": "Missing required fields!"}), 400
    success, msg = send_email(to, subject, message)
    return jsonify({"success": success, "message": msg}), (200 if success else 500)

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"msg": "API is live and CORS is working!"})

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, use_reloader=False)
