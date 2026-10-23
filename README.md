# AI Life Manager

A clean, modern personal management suite featuring four dedicated modules:
1. **Schedule / Reminders** - Task management, deadlines, and smart priority organization.
2. **Money Tracker & Smart Finance** - Budget analytics, multi-account tracking, cash flow, and financial health scoring.
3. **Personal Vault** - Zero-knowledge client-side encrypted credentials, documents, and secure notes.
4. **MediCare** - Medication schedules, drug interaction checker, biometric vitals monitoring, emergency SOS protocols, and health documents.

---

## 📁 Project Structure

```
AI Life Manager/
├── backend/          # Express REST API suite (Node.js)
│   ├── config/       # Database & security configurations
│   ├── controllers/  # Controllers for Tasks, Finance, Vault, and MediCare
│   ├── models/       # Database schemas (PostgreSQL / SQLite)
│   ├── routes/       # API route endpoints
│   ├── services/     # Business logic & drug interaction verification
│   ├── package.json  # Backend dependencies
│   └── server.js     # Main API server entry point
│
├── frontend/         # Modern Web Application
│   ├── assets/       # Static branding & visual assets
│   ├── app.js        # Main UI application logic & API clients
│   ├── index.html    # Single-page interface with clean card layout
│   ├── medicare.js   # MediCare module logic & interactions
│   ├── medicare.css  # MediCare styles
│   └── style.css     # Clean theme & responsive stylesheet
│
└── README.md         # Documentation
```

---

## 🚀 Getting Started

### 1. Start the Backend
Navigate to the `backend` directory, install dependencies, and run the server:
```bash
cd backend
npm install
node server.js
```
The API server runs on `http://localhost:4000`:
- **Health Check**: `http://localhost:4000/api/health`
- **Tasks**: `http://localhost:4000/api/tasks`
- **Finance**: `http://localhost:4000/api/finance/summary`
- **Personal Vault**: `http://localhost:4000/api/vault`
- **MediCare**: `http://localhost:4000/api/medicare/medicines`

### 2. Start the Frontend
Serve the `frontend` folder using any static web server:
```bash
# Using Python
python -m http.server 3000 --directory frontend

# Or using npx serve
npx serve frontend -l 3000
```
Open your browser and navigate to:
```
http://localhost:3000
```
