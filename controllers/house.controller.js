
let House = require('../model/House');
var db = require('../config/db');

module.exports = {

    createHouse(req, res, next) {
        console.log('housecontroller.createHouse')

        
    },

    getAll(req, res, next) {
        console.log('housecontroller.getAll');
        
    },

    getHouseById(req, res, next) {
        const id = req.params.id;
        console.log('housecontroller.getHouseID');
        
    },

    updateHouse(req, res, next) {
        console.log('housecontroller.updateHouse');

    },

    deleteHouse(req, res, next) {
        console.log('housecontroller.deleteHouse')

    }

}
