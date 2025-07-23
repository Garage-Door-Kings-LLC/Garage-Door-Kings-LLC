// webhook-server.js
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET = 'LotoTboySecure_2025'; // Must match GitHub webhook secret

app.use(bodyParser.json());

app.post('/github-webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);

  const hmac = crypto.createHmac('sha256', SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');

  if (signature !== digest) {
    return res.status(403).send('Signature mismatch');
  }

  console.log('✅ Webhook received from GitHub:');
  console.log(req.body);

  res.status(200).send('Webhook received successfully');
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook server running at http://localhost:${PORT}`);
});
