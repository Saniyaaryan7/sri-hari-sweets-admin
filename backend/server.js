const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/errorMiddleware');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('dev'));

// Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

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

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
