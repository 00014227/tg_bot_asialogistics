const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');
const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('✅ Backend API working over HTTPS!');
});

const HTTPS_PORT = 443;
const HTTP_PORT = 80;

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/back.transosiyo-express.uz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/back.transosiyo-express.uz/fullchain.pem'),
};

// HTTPS server
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`✅ HTTPS API server running on port ${HTTPS_PORT}`);
});

// Optional: redirect HTTP to HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(HTTP_PORT);
