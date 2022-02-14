const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const URL = process.env.URL;
const dbClient = new MongoClient(URL);

// Middleware

app.use(express.json());

app.listen(PORT, console.log('server is running on port ' + PORT));
