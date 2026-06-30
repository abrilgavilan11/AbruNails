const http = require('http');

const data = JSON.stringify({
  name: "Test Name",
  description: "Test Desc",
  price: 1000,
  duration: 60,
  categoryId: "any",
  image: "http://example.com/test.jpg"
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/services',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
