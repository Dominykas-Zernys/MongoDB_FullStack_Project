const { dbClient } = require('../helpers/dbHelper');

async function getAllUsers(order) {
  try {
    await dbClient.connect();
    const users = await dbClient
      .db('fstackProject')
      .collection('users')
      .aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: 'services',
            localField: 'service_id',
            foreignField: '_id',
            as: 'membership',
          },
        },
      ])
      .sort(order === 'dsc' ? { surname: -1 } : { surname: 1 })
      .toArray();
    dbClient.close();
    const usersWithServices = [];
    users.map(
      (user) =>
        (user = usersWithServices.push({
          ...user,
          membership: user.membership[0].name,
        }))
    );
    return usersWithServices;
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
