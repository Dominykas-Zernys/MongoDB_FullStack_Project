require('dotenv').config();

const { MongoClient } = require('mongodb');
const URL = process.env.URL;
const dbClient = new MongoClient(URL);

function successResponse(res, data, status = 200) {
  res.status(status).json({
    success: true,
    data,
  });
}

function failResponse(res, error = 'something went wrong', status = 500) {
  res.status(status).json({
    success: false,
    error: error,
  });
}

module.exports = { successResponse, failResponse, dbClient };
