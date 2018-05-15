
var express = require('express');
var routes = express.Router();
var mealController = require('../controllers/meal.controller');

module.exports = {}

routes.post('/meals/create', mealController.createMeal);
routes.get('/meals', mealController.getAll);
routes.get('/meals/:id', mealController.getMealById);
routes.put('/meals/update/:id', mealController.updateMeal);
routes.delete('/meals/delete/:id', mealController.deleteMeal);

module.exports = routes;