// Usage: node get-installation-token.js
const fs = require('fs');
const jwt = require('jsonwebtoken');

const config = JSON.parse(fs.readFileSync(__dirname + '/github-app-config.json'));
const APP_ID = config.app_id;
const INSTALL_ID = config.install_id;
const PRIVATE_KEY_PATH = config.private_key_path;

console.log('Attempting to read PEM file from:', PRIVATE_KEY_PATH);

if (!APP_ID || !INSTALL_ID || !PRIVATE_KEY_PATH) {
  console.error('Please fill in app_id, install_id, and private_key_path in github-app-config.json');
  process.exit(1);
}

const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH);
const payload = {
  iat: Math.floor(Date.now() / 1000) - 60,
  exp: Math.floor(Date.now() / 1000) + (10 * 60),
  iss: APP_ID
};
const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });

const url = `https://api.github.com/app/installations/${INSTALL_ID}/access_tokens`;

fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json'
  }
})
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      console.log('Installation token:', data.token);
      console.log('Expires at:', data.expires_at);
    } else {
      console.error('Error:', data);
    }
  })
  .catch(err => console.error('Fetch error:', err));
