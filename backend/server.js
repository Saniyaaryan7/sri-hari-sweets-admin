const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('dev'));

// Custom Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes Placeholder
app.get('/', (req, res) => {
  res.send('Sri Hari Sweets API is running...');
});

// Import Routes (To be implemented)

app.use('/api/cakes', require('./routes/cakeRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/supercategories', require('./routes/superCategoryRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/specialities', require('./routes/specialitiesRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
