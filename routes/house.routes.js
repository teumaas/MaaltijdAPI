
var express = require('express');
var routes = express.Router();
var houseController = require('../controllers/house.controller');

module.exports = {}

routes.post('/studentenhuis', houseController.createHouse);
routes.get('/studentenhuis', houseController.getAll);
routes.get('/studentenhuis/:id', houseController.getHouseById);
routes.put('/studentenhuis/:id', houseController.updateHouse);
routes.delete('/studentenhuis/:id', houseController.deleteHouse);

module.exports = routes;