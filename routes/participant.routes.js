
var express = require('express');
var routes = express.Router();
var participantController = require('../controllers/participant.controller');

module.exports = {}

routes.post('/studentenhuis/:huisid/maaltijd/:maalid/deelnemers', participantController.createParticipant);
routes.get('/studentenhuis/:huisid/maaltijd/:maalid/deelnemers', participantController.getAll);
routes.delete('/studentenhuis/:huisid/maaltijd/:maalid/deelnemers', participantController.deleteParticipant);

module.exports = routes;
