
let Meal = require('../model/Meal');
var db = require('../config/db');

module.exports = {

    createMeal(req, res, next) {
        console.log('mealcontroller.createMeal')

    },

    getAll(req, res, next) {
        console.log('mealcontroller.getAll');
        
    },

    getMealById(req, res, next) {
        const id = req.params.id;
        console.log('mealcontroller.getMealID');
        
    },

    updateMeal(req, res, next) {
        console.log('mealcontroller.updateMeal');

    },

    deleteMeal(req, res, next) {
        console.log('mealcontroller.deleteMeal')

    }

}
