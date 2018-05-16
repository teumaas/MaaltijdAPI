
var express = require('express');
var routes = express.Router();
var houseController = require('../controllers/house.controller');

module.exports = {}

routes.post('/studentenhuis', houseController.createHouse);
routes.get('/studentenhuis', houseController.getAll);
routes.get('/studentenhuis/:huisid', houseController.getHouseById);
routes.put('/studentenhuis/:huisid', houseController.updateHouse);
routes.delete('/studentenhuis/:huisid', houseController.deleteHouse);

module.exports = routes;