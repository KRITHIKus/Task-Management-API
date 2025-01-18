
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middlewares/Authenticate');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(requestLogger);

// Authentication routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api', authenticate, taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));