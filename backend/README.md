# AI LifeManager - Backend Architecture

Modular Node.js & Express REST API for **AI LifeManager**.

## 📁 Directory Structure

```
backend/
├── config/
│   ├── database.js          # In-memory & JSON seeded database store
│   ├── postgres.js          # PostgreSQL connection & pool manager
│   └── security.js          # PBKDF2/SHA-256 PIN hashing & AES-256-GCM encryption
├── controllers/
│   ├── tasks.controller.js     # Task & Schedule operations
│   ├── finance.controller.js   # Accounts, Balances, & Transactions
│   ├── vault.controller.js     # Zero-Knowledge AES-256 Vault
│   └── medicare.controller.js  # Medications, Doses, Interactions, Appointments
├── models/
│   └── schema.sql           # Complete relational SQL database schema
├── routes/
│   ├── tasks.routes.js
│   ├── finance.routes.js
│   ├── vault.routes.js
│   └── medicare.routes.js
├── services/
│   └── drugInteraction.service.js # Clinical pairwise drug interaction analyzer
├── server.js                # Express app entrypoint (Port 4000)
└── package.json
```

## 🔒 Security Architecture: Zero-Knowledge Personal Vault

The backend guarantees **strict isolation** of the Personal Vault:
1. **Zero-Knowledge Encryption**: Master PIN is hashed using PBKDF2/SHA-256. Vault secrets are encrypted with AES-256-GCM using keys derived from the master PIN.
2. **Hard Barrier Protection**: Personal Vault records are protected with client-side zero-knowledge proofs.

## 🚀 Running the Backend

```bash
cd backend
npm install
node server.js
```

Server runs by default at `http://localhost:4000`.

### Health Check
```
GET http://localhost:4000/api/health
```

### Key API Endpoints
- **Schedule**: `GET /api/tasks`, `POST /api/tasks`, `PATCH /api/tasks/:id/toggle`, `DELETE /api/tasks/:id`
- **Finance**: `GET /api/finance/summary`, `GET /api/finance/accounts`, `POST /api/finance/transactions`
- **Personal Vault**: `POST /api/vault/verify-pin`, `GET /api/vault/records`, `POST /api/vault/records`
- **MediCare**: `GET /api/medicare/medicines`, `POST /api/medicare/medicines`, `GET /api/medicare/doses/today`, `POST /api/medicare/doses/:id/log`, `POST /api/medicare/interactions/check`, `GET /api/medicare/appointments`
