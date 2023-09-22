const crypto = require('crypto');

// Function to hash metadata using SHA-256
function hashMetadata(metadata) {
  const hash = crypto.createHash('sha256').update(metadata).digest('hex');
  return hash;
}

module.exports = { hashMetadata };
