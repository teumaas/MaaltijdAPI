
var express = require('express');
var routes = express.Router();
var mealController = require('../controllers/meal.controller');

module.exports = {}

routes.post('', mealController.createMeal);
routes.get('', mealController.getAll);
routes.get('', mealController.getMealById);
routes.put('', mealController.updateMeal);
routes.delete('', mealController.deleteMeal);

module.exports = routes;