
var express = require('express');
var routes = express.Router();
var userController = require('../controllers/user.controller');

module.exports = {}

routes.post('', userController.createUser);
routes.get('', userController.getAll);
routes.delete('', userController.deleteUser);

module.exports = routes;
