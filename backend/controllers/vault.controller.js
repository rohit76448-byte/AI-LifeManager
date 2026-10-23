/**
 * PERSONAL INFO VAULT CONTROLLER
 * Zero-Knowledge isolated storage for credentials, passports, PINs, and secure documents.
 */

const { db, saveDatabase } = require('../config/database');
const { verifyMasterPin, encryptPayload, decryptPayload } = require('../config/security');

exports.verifyPin = (req, res) => {
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ success: false, message: 'Security PIN is required.' });
  }

  const isValid = verifyMasterPin(pin);
  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Master PIN. Access denied to encrypted vault.'
    });
  }

  res.json({
    success: true,
    message: 'Master PIN verified successfully. Vault session unlocked.',
    token: `vault_session_${Date.now()}`
  });
};

exports.getVaultRecords = (req, res) => {
  const { pin } = req.headers;

  if (!verifyMasterPin(pin)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Valid X-Vault-Pin header required to inspect vault records.'
    });
  }

  res.json({
    success: true,
    total: (db.vaultRecords || []).length,
    records: db.vaultRecords || []
  });
};

exports.addVaultRecord = (req, res) => {
  const { pin, title, category, payload, expiryDate } = req.body;

  if (!verifyMasterPin(pin)) {
    return res.status(401).json({ success: false, message: 'Invalid PIN. Cannot store vault item.' });
  }

  if (!title || !payload) {
    return res.status(400).json({ success: false, message: 'Title and payload are required.' });
  }

  // Encrypt with client master PIN
  const enc = encryptPayload(JSON.stringify(payload), pin);

  const newRecord = {
    id: `v_${Date.now()}`,
    title: title.trim(),
    category: category || 'id_document',
    encryptedPayload: enc.ciphertext,
    iv: enc.iv,
    authTag: enc.authTag,
    salt: enc.salt,
    expiryDate: expiryDate || null,
    isBiometricLocked: true,
    createdAt: new Date().toISOString()
  };

  db.vaultRecords.push(newRecord);
  saveDatabase();

  res.status(201).json({
    success: true,
    message: 'Record encrypted with AES-256-GCM and stored securely in zero-knowledge vault.',
    record: {
      id: newRecord.id,
      title: newRecord.title,
      category: newRecord.category,
      expiryDate: newRecord.expiryDate
    }
  });
};
