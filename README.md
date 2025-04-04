# 🗓️ Appointment System - Admin Panel, Frontend & Chatbot

This project includes an **Admin Panel (Django)**, a **Frontend (JavaScript)**, and a **Chatbot (Python)**. Follow the steps below to set up and run everything locally.

---

## 🚀 How to Run the Project

### Step-by-Step Instructions

1. **Open the project** in **Visual Studio Code (VS Code)**.

2. **Open a terminal** and run the following commands to start the **backend (Django)**:

```bash
cd adminpanel
py -m venv venv
venv\scripts\activate
pip install -r requirement.txt
cd appoitment_system
py manage.py runserver
```

2. **Open a second terminal and run the following commands to start the frontend:**:

```bash
npm install
npm run dev
```

3. **Open a third terminal and run the following commands to start the chatbot:**:

```bash
cd chatbot
py -m venv venv
venv\scripts\activate
pip install -r requirement.txt
py chatbot.py
```

---

## ℹ️ Important Notes

### Prerequisites
- Ensure you have these installed before proceeding:
  - Python 3.10.11
  - Node.js LTS (v22.11.0)
  - pip (Python package manager)
  - npm/yarn (Node package manager)

### Default URLs
| Component       | URL                   |
|-----------------|-----------------------|
| Django Admin    | `http://127.0.0.1:8000/admin` |
| Frontend        | `http://localhost:3000`       |
| API Docs        | `run internally as a service` |

### Notes:
- The chatbot will need to be configured with the appropriate API keys if it uses any external services

