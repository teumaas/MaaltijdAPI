
var express = require('express');
var routes = express.Router();
var houseController = require('../controllers/house.controller');

module.exports = {}

routes.post('', houseController.createHouse);
routes.get('', houseController.getAll);
routes.get('', houseController.getHouseById);
routes.put('', houseController.updateHouse);
routes.delete('', houseController.deleteHouse);

module.exports = routes;