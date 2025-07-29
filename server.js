const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// ✅ Улучшенные CORS настройки
app.use(cors({
  origin: '*', // Или конкретный адрес фронта, например: 'https://t.me/your_webapp_url'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Backend API working!');
});

app.listen(PORT, () => {
  console.log(`✅ API server running on port ${PORT}`);
});