require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT;

// Middleware

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes

const servicesRoutes = require('./routes/servicesRoutes');
app.use('/memberships', servicesRoutes);

const usersRoutes = require('./routes/usersRoutes');
app.use('/users', usersRoutes);

// Running the server

app.listen(PORT, console.log('server is running on port ' + PORT));
