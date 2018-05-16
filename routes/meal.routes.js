
var express = require('express');
var routes = express.Router();
var mealController = require('../controllers/meal.controller');

module.exports = {}

routes.post('/studentenhuis/:huisid/maaltijd', mealController.createMeals);
routes.get('/studentenhuis/:huisid/maaltijd', mealController.getAll);
routes.get('/studentenhuis/:huisid/maaltijd/:maalid', mealController.getMealById);
routes.put('/studentenhuis/:huisid/maaltijd/:maalid', mealController.updateMeal);
routes.delete('/studentenhuis/:huisid/maaltijd/:maalid', mealController.deleteMeal);

module.exports = routes;