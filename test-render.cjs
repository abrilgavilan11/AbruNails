const https = require('https');
https.get('https://abrunails.onrender.com/api/users', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', data));
}).on('error', (err) => console.log('Error:', err.message));
