require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;
const dbClient = new MongoClient(URL);

// Middleware

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes

app.get('/memberships', async (req, res) => {
  try {
    await dbClient.connect();
    const services = await dbClient
      .db('fstackProject')
      .collection('services')
      .find()
      .toArray();
    dbClient.close();
    res.json({ msg: 'success', data: services });
  } catch (err) {
    res.json({ msg: 'something went wrong', err: err });
  }
});

app.post('/memberships', async (req, res) => {
  try {
    const newMembership = req.body;
    await dbClient.connect();
    const createNewMembership = await dbClient
      .db('fstackProject')
      .collection('services')
      .insertOne(newMembership);
    dbClient.close();
    res.json({ msg: 'success', data: createNewMembership });
  } catch (err) {
    res.json({ msg: 'something went wrong', err: err });
  }
});

app.delete('/memberships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await dbClient.connect();
    const deleteMembership = await dbClient
      .db('fstackProject')
      .collection('services')
      .deleteOne({ _id: ObjectId(id) });
    dbClient.close();
    res.json(deleteMembership);
  } catch (err) {
    res.json({ msg: 'something went wrong', err: err });
  }
});

app.get('/users/:order', async (req, res) => {
  try {
    const { order } = req.params;
    await dbClient.connect();
    const users = await dbClient
      .db('fstackProject')
      .collection('users')
      .find()
      .sort(order === 'asc' ? { surname: 1 } : { surname: -1 })
      .toArray();
    dbClient.close();
    res.json({ msg: 'success', data: users });
  } catch (err) {
    res.json({ msg: 'something went wrong', err: err });
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = req.body;
    await dbClient.connect();
    const createNewUser = await dbClient
      .db('fstackProject')
      .collection('users')
      .insertOne(newUser);
    dbClient.close();
    res.json({ msg: 'success', data: createNewUser });
  } catch (err) {
    res.json({ msg: 'something went wrong', err: err });
  }
});

// Running the server

app.listen(PORT, console.log('server is running on port ' + PORT));
