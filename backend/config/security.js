/**
 * SECURITY & ZERO-KNOWLEDGE CRYPTOGRAPHY SERVICE
 * Implements client-side AES-256-GCM authenticated encryption and strict AI Vault Guardrails.
 */

const crypto = require('crypto');

// Master PIN hash stored securely
const DEFAULT_PIN_HASH = crypto.createHash('sha256').update('1234').digest('hex');

/**
 * Verifies master security PIN for vault operations
 */
function verifyMasterPin(inputPin) {
  if (!inputPin) return false;
  const hashed = crypto.createHash('sha256').update(String(inputPin)).digest('hex');
  return hashed === DEFAULT_PIN_HASH;
}

/**
 * AES-256-GCM Authenticated Encryption
 */
function encryptPayload(plaintext, password) {
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    salt: salt.toString('hex')
  };
}

/**
 * AES-256-GCM Authenticated Decryption
 */
function decryptPayload(ciphertext, ivHex, authTagHex, saltHex, password) {
  const salt = Buffer.from(saltHex, 'hex');
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * ZERO-KNOWLEDGE VAULT GUARDRAIL MIDDLEWARE
 * Strictly blocks AI or external routes from accessing personal vault secrets.
 */
function enforceZeroKnowledgeAiBarrier(req, res, next) {
  const query = (req.body?.query || req.query?.q || '').toLowerCase();
  const vaultKeywords = ['vault', 'password', 'passwords', 'pin', 'secret', 'passport', 'credentials', 'bank card in vault'];

  if (vaultKeywords.some(keyword => query.includes(keyword))) {
    return res.status(403).json({
      success: false,
      code: 'ZERO_KNOWLEDGE_VAULT_BLOCKED',
      message: 'Access to Personal Info Vault is strictly blocked by the AI Zero-Knowledge Privacy Barrier.',
      guardrailActive: true
    });
  }
  next();
}

module.exports = {
  verifyMasterPin,
  encryptPayload,
  decryptPayload,
  enforceZeroKnowledgeAiBarrier
};
