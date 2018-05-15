
var express = require('express');
var routes = express.Router();
var mealController = require('../controllers/meal.controller');

module.exports = {}

routes.post('/studentenhuis/:id/maaltijd', mealController.createMeal);
routes.get('/studentenhuis/:id/maaltijd', mealController.getAll);
routes.get('/studentenhuis/:id/maaltijd/:id', mealController.getMealById);
routes.put('/studentenhuis/:id/maaltijd/:id', mealController.updateMeal);
routes.delete('/studentenhuis/:id/maaltijd/:id', mealController.deleteMeal);

module.exports = routes;