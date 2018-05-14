
var express = require('express');
var routes = express.Router();
var houseController = require('../controllers/house.controller');

module.exports = {}

routes.post('/houses/create', houseController.createHouse);
routes.get('/houses', houseController.getAll);
routes.get('/houses/:id', houseController.getHouseById);
routes.put('/houses/update/:id', houseController.updateHouse);
routes.delete('/houses/delete/:id', houseController.deleteHouse);

module.exports = routes;