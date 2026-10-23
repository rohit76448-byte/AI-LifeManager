-- ============================================================================
-- MINE AI LIFEMANAGER DATABASE SCHEMA (SQL DDL)
-- Unified Data Models across Tasks, Finance, Vault, MediCare, and Chatbot RAG
-- ============================================================================

-- 1. TASK MANAGEMENT & SCHEDULE
CREATE TABLE IF NOT EXISTS task_lists (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    list_id TEXT NOT NULL REFERENCES task_lists(id) ON DELETE CASCADE,
    sub_list_id TEXT DEFAULT 'all',
    title TEXT NOT NULL,
    notes TEXT,
    priority TEXT CHECK(priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')) DEFAULT 'MEDIUM',
    due_date DATE,
    due_time TEXT,
    is_all_day INTEGER DEFAULT 0,
    remind_when_due INTEGER DEFAULT 1,
    completed INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    tags TEXT, -- JSON array of tags
    sub_tasks TEXT, -- JSON array of subtasks
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. MONEY TRACKER & PERSONAL FINANCE
CREATE TABLE IF NOT EXISTS finance_accounts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('bank', 'cash', 'card', 'savings', 'upi')) NOT NULL,
    balance REAL NOT NULL DEFAULT 0.00,
    currency TEXT DEFAULT '$',
    account_number_masked TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS finance_transactions (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL REFERENCES finance_accounts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense', 'transfer')) NOT NULL,
    category TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS finance_budgets (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    monthly_limit REAL NOT NULL,
    spent_amount REAL DEFAULT 0.00,
    month_year TEXT NOT NULL
);

-- 3. ZERO-KNOWLEDGE PERSONAL INFO VAULT (AES-256-GCM ENCRYPTED)
CREATE TABLE IF NOT EXISTS vault_records (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT CHECK(category IN ('id_document', 'passport', 'password', 'bank_card', 'biometric', 'secret_note')) NOT NULL,
    encrypted_payload TEXT NOT NULL, -- AES-256-GCM ciphertext
    initialization_vector TEXT NOT NULL, -- 12-byte IV (Base64)
    auth_tag TEXT NOT NULL, -- 16-byte GCM tag (Base64)
    salt TEXT NOT NULL, -- PBKDF2 Key derivation salt
    expiry_date DATE,
    is_biometric_locked INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vault_security_audit (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    status TEXT CHECK(status IN ('SUCCESS', 'DENIED', 'BLOCKED_AI_ATTEMPT')) NOT NULL,
    client_ip TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. MEDICARE AI HEALTH & MEDICATION MANAGEMENT
CREATE TABLE IF NOT EXISTS medicare_medicines (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    generic_name TEXT,
    condition TEXT NOT NULL,
    type TEXT CHECK(type IN ('Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Inhaler', 'Drops')) DEFAULT 'Tablet',
    strength TEXT NOT NULL,
    dosage_amount TEXT NOT NULL,
    frequency TEXT NOT NULL,
    instructions TEXT,
    start_date DATE,
    end_date DATE,
    quantity_available INTEGER NOT NULL DEFAULT 0,
    refill_threshold INTEGER DEFAULT 5,
    doctor_notes TEXT,
    disclaimer TEXT DEFAULT 'Informational only. Consult a doctor or pharmacist before making medication changes.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicare_doses (
    id TEXT PRIMARY KEY,
    medicine_id TEXT NOT NULL REFERENCES medicare_medicines(id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    scheduled_time TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'taken', 'skipped', 'snoozed')) DEFAULT 'pending',
    taken_at TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicare_appointments (
    id TEXT PRIMARY KEY,
    doctor_name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    clinic TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    notes TEXT,
    status TEXT CHECK(status IN ('Confirmed', 'Pending', 'Completed', 'Cancelled')) DEFAULT 'Confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. AI CHATBOT CONVERSATIONS & AUTOMATION AUDIT
CREATE TABLE IF NOT EXISTS chatbot_messages (
    id TEXT PRIMARY KEY,
    sender TEXT CHECK(sender IN ('user', 'ai', 'system')) NOT NULL,
    text TEXT NOT NULL,
    action_type TEXT, -- e.g. 'TASK_CREATED', 'FINANCE_LOGGED', 'DOSE_MARKED'
    action_payload TEXT, -- JSON action card details
    timestamp TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
