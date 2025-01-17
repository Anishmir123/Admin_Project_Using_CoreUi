// app.js

// Importing necessary modules
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const i18n = require('i18n');
require('dotenv').config(); 
const fileUpload = require('express-fileupload');


//newly add here


// Importing routes and middleware
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.auth');
const authMiddleware = require('./middlewares/auth.middleware');
const { verifyToken } = require('./utils/jwt.utils'); // Import verifyToken
const { studentCreateForm } = require('./controllers/student.controller'); // Import studentCreateForm

const app = express();
const PORT = process.env.DB_PORT || 3007;
                                                           
// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Locale']
}));
app.options('*', cors());


// Mock data (replace with real database query)
const data = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Name ${index + 1}`,
  email: `name${index + 1}@example.com`,
  age: 20 + (index % 50),
}));

// Localization configuration
i18n.configure({
  locales: ['en', 'bn'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  objectNotation: true,
  autoReload: true,
  updateFiles: true,
  syncFiles: true
});
app.use(i18n.init);

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'qwer1234',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/auth', studentRoutes);

// Example route using verifyToken middleware
app.post('/api/auth/studentCreateForm', verifyToken, studentCreateForm); // Now using the defined function

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});


// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

app.use(fileUpload());

// app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));


// newly add  here 

