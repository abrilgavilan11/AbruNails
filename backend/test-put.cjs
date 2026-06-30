const http = require('http');

const data = JSON.stringify({
  image: "https://example.com/manicura.jpg"
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/services/5204a27d-fa0d-4c75-bd29-32691835e99e',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
