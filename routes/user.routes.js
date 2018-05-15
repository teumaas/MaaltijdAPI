
var express = require('express');
var routes = express.Router();
var userController = require('../controllers/user.controller');

module.exports = {}

routes.post('/users/create', userController.createUser);
routes.get('/users', userController.getAll);
routes.delete('/users/delete/:id', userController.deleteUser);

module.exports = routes;
