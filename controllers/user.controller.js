
let User = require('../model/User');
var db = require('../config/db');

module.exports = {

    createUser(req, res, next) {
        console.log('usercontroller.createUser')

        db.query('SELECT * FROM user', function(error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });

    },

    getAll(req, res, next) {
        console.log('usercontroller.getAll');
        
    },

    deleteUser(req, req, next) {
        console.log('usercontroller.deleteUser');


    }
}