const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


// Request logging
app.use(morgan('dev'));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/job', jobRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = app;
