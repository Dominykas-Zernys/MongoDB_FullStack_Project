const { successResponse, failResponse } = require('../helpers/dbHelper');
const userModel = require('../models/userModel');

async function getUsers(req, res) {
  const { order } = req.params;
  const allUsers = await userModel.getAllUsers(order);
  if (allUsers) {
    successResponse(res, allUsers);
    return;
  }
  failResponse(res);
}

async function postUsers(req, res) {
  const newUser = req.body;
  const postNewUser = await userModel.postNewUser(newUser);
  if (postNewUser) {
    successResponse(res, postNewUser);
    return;
  }
  failResponse(res);
}

module.exports = { getUsers, postUsers };
