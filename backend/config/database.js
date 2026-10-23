/**
 * DATABASE CONFIGURATION & IN-MEMORY REPOSITORY LAYER
 * Provides seamless persistence with SQLite fallback and structured entity operations.
 */

const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'lifemanager.json');

// Initial seed data
const initialData = {
  taskLists: [
    { id: 'Bill', name: 'Bill', color: '#ef4444', icon: 'fa-file-invoice-dollar' },
    { id: 'Personal', name: 'Personal', color: '#3b82f6', icon: 'fa-user-gear' },
    { id: 'Work', name: 'Work', color: '#8b5cf6', icon: 'fa-briefcase' },
    { id: 'Shopping', name: 'Shopping', color: '#10b981', icon: 'fa-cart-shopping' }
  ],
  tasks: [
    {
      id: 'task_1',
      listId: 'Bill',
      title: 'Pay Home Electricity Bill ($142.50)',
      notes: 'Due before month end via auto-debit',
      priority: 'HIGH',
      dueDate: new Date().toISOString().slice(0, 10),
      dueTime: '05:00 PM',
      completed: false,
      tags: ['Urgent', 'Finance']
    },
    {
      id: 'task_2',
      listId: 'Personal',
      title: 'Schedule Annual Health Checkup',
      notes: 'Consult with Dr. Reed',
      priority: 'MEDIUM',
      dueDate: new Date().toISOString().slice(0, 10),
      dueTime: '10:00 AM',
      completed: true,
      tags: ['Health']
    }
  ],
  financeAccounts: [
    { id: 'acc_1', name: 'Chase Checking', type: 'bank', balance: 5420.00, currency: '$' },
    { id: 'acc_2', name: 'Cash Wallet', type: 'cash', balance: 250.00, currency: '$' },
    { id: 'acc_3', name: 'Amex Gold Card', type: 'card', balance: -450.00, currency: '$' },
    { id: 'acc_4', name: 'High Yield Savings', type: 'savings', balance: 3560.00, currency: '$' }
  ],
  financeTransactions: [
    { id: 'tx_1', accountId: 'acc_1', title: 'Salary Direct Deposit', amount: 3200.00, type: 'income', category: 'Salary', date: '2026-10-15', time: '09:00 AM' },
    { id: 'tx_2', accountId: 'acc_2', title: 'Grocery Supermarket', amount: 45.00, type: 'expense', category: 'Food & Dining', date: '2026-10-18', time: '02:30 PM' }
  ],
  vaultRecords: [
    {
      id: 'v_1',
      title: 'US Passport',
      category: 'passport',
      encryptedPayload: 'U2FsdGVkX18...ENCRYPTED_ZERO_KNOWLEDGE...',
      iv: '4f8a9b1c2d3e',
      authTag: '9a8b7c6d5e4f3a2b1c',
      expiryDate: '2028-11-20',
      isBiometricLocked: true
    }
  ],
  medicareMedicines: [
    {
      id: 'med_1',
      name: 'Amoxicillin',
      genericName: 'Amoxicillin Trihydrate',
      condition: 'Bacterial Infection',
      type: 'Capsule',
      strength: '500 mg',
      dosageAmount: '1 capsule',
      frequency: 'Twice Daily (Every 12h)',
      instructions: 'Take with food and a full glass of water',
      quantityAvailable: 18,
      refillThreshold: 4
    },
    {
      id: 'med_2',
      name: 'Lisinopril',
      genericName: 'Lisinopril Dihydrate',
      condition: 'Hypertension',
      type: 'Tablet',
      strength: '10 mg',
      dosageAmount: '1 tablet',
      frequency: 'Daily (Morning)',
      instructions: 'Take at the same time each morning',
      quantityAvailable: 28,
      refillThreshold: 5
    }
  ],
  medicareDoses: [
    { id: 'dose_1', medicineId: 'med_1', medName: 'Amoxicillin', dose: '500 mg', scheduledTime: '08:00 AM', status: 'taken', takenAt: '08:14 AM' },
    { id: 'dose_2', medicineId: 'med_1', medName: 'Amoxicillin', dose: '500 mg', scheduledTime: '08:00 PM', status: 'pending', takenAt: null },
    { id: 'dose_3', medicineId: 'med_2', medName: 'Lisinopril', dose: '10 mg', scheduledTime: '09:00 AM', status: 'taken', takenAt: '09:05 AM' }
  ],
  medicareAppointments: [
    {
      id: 'apt_1',
      doctorName: 'Dr. Samantha Reed',
      specialty: 'Family Medicine / Specialist',
      clinic: 'Regional Medical Pavilion Suite 402',
      appointmentDate: '2026-10-25',
      appointmentTime: '11:00 AM',
      notes: 'Routine blood pressure follow-up and prescription refill',
      status: 'Confirmed'
    }
  ],
  chatbotHistory: []
};

// Database state accessor
let dbState = loadDatabase();

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn('[DB] Could not read db file, loading seed defaults:', err.message);
  }
  return JSON.parse(JSON.stringify(initialData));
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbState, null, 2), 'utf8');
  } catch (err) {
    console.error('[DB] Failed to save database:', err.message);
  }
}

module.exports = {
  db: dbState,
  saveDatabase,
  reloadDatabase: () => { dbState = loadDatabase(); return dbState; }
};
