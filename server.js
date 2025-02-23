const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/middlewares/logger');
const authRoutes = require('./src/routes/authRoutes');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(authRoutes);
app.use(taskRoutes);

// Place after all routes
app.use(errorHandler);

// Add logger middleware
app.use(logger);

app.use('/uploads', express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Test route
app.get('/ping', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Connect to database
connectDB();
