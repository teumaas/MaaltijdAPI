
var express = require('express');
var routes = express.Router();
var userController = require('../controllers/user.controller');

module.exports = {}

routes.post('/studentenhuis/:id/maaltijd/:id/deelnemers', userController.createUser);
routes.get('/studentenhuis/:id/maaltijd/:id/deelnemers', userController.getAll);
routes.delete('/studentenhuis/:id/maaltijd/:id/deelnemers', userController.deleteUser);

module.exports = routes;
