// index.js
require('dotenv').config();

const port = process.env.PORT || 3000;
const greeting = process.env.GREETING || 'Hello';
const target = process.env.TARGET || 'World';

console.log(`${greeting}, ${target}!`);
console.log(`Server is supposed to run on port ${port}`);

// Keep the container running
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Server is running\n');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
