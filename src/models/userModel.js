const { dbClient } = require('../helpers/dbHelper');

async function getAllUsers(order) {
  try {
    await dbClient.connect();
    const users = await dbClient
      .db('fstackProject')
      .collection('users')
      .find()
      .sort(order === 'asc' ? { surname: 1 } : { surname: -1 })
      .toArray();
    dbClient.close();
    return users;
  } catch (err) {
    console.warn('getAllUsers error', err);
    return false;
  }
}

async function postNewUser(newUser) {
  try {
    await dbClient.connect();
    const createNewUser = await dbClient
      .db('fstackProject')
      .collection('users')
      .insertOne(newUser);
    dbClient.close();
    return createNewUser;
  } catch (err) {
    console.warn('getAllUsers error', err);
    return false;
  }
}

module.exports = { getAllUsers, postNewUser };
