import numpy
import tflearn
import tensorflow
import random
import json
import nltk
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

nltk.download('punkt_tab')
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()
app = Flask(__name__)
# Update your CORS configuration like this:
CORS(app, resources={
    r"/*": {
        "origins": "https://ai-healthcare-chatbot-using-python.vercel.app",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

with open('intents.json') as file:
    data=json.load(file)

words = []
labels = []
docs_x = []
docs_y = []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        wrds = nltk.word_tokenize(pattern)
        words.extend(wrds)
        docs_x.append(wrds)
        docs_y.append(intent["tag"])

    if intent["tag"] not in labels:
        labels.append(intent["tag"])

words = [stemmer.stem(w.lower()) for w in words if w != "?"]
words = sorted(list(set(words)))
labels = sorted(labels)
training = []
output = []

out_empty = [0 for _ in range(len(labels))]

for x, doc in enumerate(docs_x):
    bag = []
    wrds = [stemmer.stem(w) for w in doc]

    for w in words:
        if w in wrds:
            bag.append(1)
        else:
            bag.append(0)

    output_row = out_empty[:]
    output_row[labels.index(docs_y[x])] = 1

    training.append(bag)
    output.append(output_row)

training = numpy.array(training)
output  = numpy.array(output)

tensorflow.compat.v1.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net,8)
net = tflearn.fully_connected(net,8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

try:
    model.load("model.tflearn")
except:
    model = tflearn.DNN(net)
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save("model.tflearn")

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return numpy.array(bag)
slist = ["hii","hiii","hi"]

def chat(msg):
    if msg.lower() == "quit":
        return "thank you"
    if msg.lower() in slist:
        return "Hii..how can i help you sir"
    results = model.predict([bag_of_words(msg, words)])[0]
    results_index = numpy.argmax(results)
    tag = labels[results_index]

    if results[results_index]>0.5:
        for tg in data["intents"]:
            if tg['tag'] == tag:
                responses = tg['responses']
                return random.choice(responses)
    else:
        return "I didnt get that, try again"

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

# Email credentials
EMAIL_USER = "vvitproject1234@gmail.com"
EMAIL_PASS = "culr gzbv tstb nyrv"

def send_email(to, subject, message):
    try:
        # Set up the MIME
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = to
        msg['Subject'] = subject

        # Attach the message to the email body
        msg.attach(MIMEText(message, 'plain'))

        # Set up the SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # Secure the connection

        # Log in to the server
        server.login(EMAIL_USER, EMAIL_PASS)

        # Send the email
        text = msg.as_string()
        server.sendmail(EMAIL_USER, to, text)

        server.quit()

        return True, "Email sent successfully!"

    except Exception as e:
        return False, str(e)
    
@app.route('/send_email', methods=['POST', 'OPTIONS'])
def send_email_api():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    # Get the data from the request
    data = request.get_json()

    to = data.get('to')
    subject = data.get('subject')
    message = data.get('message')

    if not to or not subject or not message:
        return jsonify({"success": False, "message": "Missing required fields!"}), 400

    success, msg = send_email(to, subject, message)

    if success:
        return jsonify({"success": True, "message": msg}), 200
    else:
        return jsonify({"success": False, "message": msg}), 500

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"msg": "API is live and CORS is working!"})

if __name__ == '__main__':
    app.run(debug=True)
