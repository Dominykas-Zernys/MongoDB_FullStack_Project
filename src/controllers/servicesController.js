const { successResponse, failResponse } = require('../helpers/dbHelper');
const serviceModel = require('../models/serviceModel');

async function getServices(req, res) {
  const allServices = await serviceModel.getAllServices();
  if (allServices) {
    successResponse(res, allServices);
    return;
  }
  failResponse(res);
}

async function postServices(req, res) {
  const newMembership = req.body;
  const newService = await serviceModel.postNewService(newMembership);
  if (newService) {
    successResponse(res, newService);
    return;
  }
  failResponse(res);
}

async function deleteServices(req, res) {
  const { id } = req.params;
  const deletedService = await serviceModel.deleteOneService(id);
  if (deletedService) {
    successResponse(res, deletedService);
    return;
  }
  failResponse(res);
}

module.exports = {
  getServices,
  postServices,
  deleteServices,
};
