const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-frontend-url.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Portfolio API',
    endpoints: {
      users: '/api/users',
      projects: '/api/projects',
      blog: '/api/blog',
      contact: '/api/contact'
    }
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
