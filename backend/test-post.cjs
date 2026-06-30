const http = require('http');

const data = JSON.stringify({
  name: "Test Name",
  description: "Test Desc",
  price: 1000,
  duration: 60,
  categoryId: "587db2fa-6663-455a-bd54-5264b3ed9b6b", // any string, wait, schema says String
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/services',
  method: 'POST',
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
