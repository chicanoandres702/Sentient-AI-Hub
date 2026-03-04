// GitHub webhook handler (basic scaffold)
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
require('dotenv').config();

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

function verifySignature(req) {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  hmac.update(payload);
  const digest = 'sha256=' + hmac.digest('hex');
  return signature === digest;
}

router.post('/webhook', express.json(), (req, res) => {
  if (!verifySignature(req)) {
    return res.status(401).send('Invalid signature');
  }
  // Handle events here
  res.status(200).send('Webhook received');
});

module.exports = router;
