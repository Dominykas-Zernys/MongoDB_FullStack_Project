const { ObjectId } = require('mongodb');
const { dbClient } = require('../helpers/dbHelper');

async function getAllServices() {
  try {
    await dbClient.connect();
    const services = await dbClient
      .db('fstackProject')
      .collection('services')
      .find()
      .toArray();
    await dbClient.close();
    return services;
  } catch (err) {
    console.warn('getAllServices error', err);
    return false;
  }
}

async function postNewService(newService) {
  try {
    await dbClient.connect();
    const createNewMembership = await dbClient
      .db('fstackProject')
      .collection('services')
      .insertOne(newService);
    await dbClient.close();
    return createNewMembership;
  } catch (err) {
    console.warn('postNewService error', err);
    return false;
  }
}

async function deleteOneService(idToDelete) {
  try {
    await dbClient.connect();
    const deleteMembership = await dbClient
      .db('fstackProject')
      .collection('services')
      .deleteOne({ _id: ObjectId(idToDelete) });
    await dbClient.close();
    return deleteMembership;
  } catch (err) {
    console.warn('postNewService error', err);
    return false;
  }
}

module.exports = { getAllServices, postNewService, deleteOneService };
