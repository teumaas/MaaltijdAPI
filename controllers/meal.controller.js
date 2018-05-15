
let Meal = require('../model/Meal');
let db = require('../config/db');

module.exports = {

    createMeals(req, res, next) {
        console.log('mealcontroller.createMeal')
        db.query('INSERT INTO maaltijd (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES (?, ?, ?, ?, ?, 1, 1)', [req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, req.body.userid, req.params.studenthuisid], function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                res.status(200).json(rows).end();
            }
        })
    },

    getAll(req, res, next) {
        console.log('mealcontroller.getAll');

        db.query("SELECT ID, Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ?", [req.params.huisid], function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                res.status(200).json(rows).end()
            }
        });
    },

    getMealById(req, res, next) {
        console.log('mealcontroller.getMealbyID');

        db.query("SELECT ID, Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?", [req.params.huisid, req.params.maalid], function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                res.status(200).json(rows).end()
            }
        });
    },

    updateMeal(req, res, next) {
        console.log('mealcontroller.updateMeal');

        db.query('UPDATE maaltijd SET (Naam = ?, Beschrijving = ?, Ingredienten = ?, Allergie = ?, Prijs = ?) WHERE StudentenhuisID = ? AND ID = ?', [req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, req.body.userid, req.params.huisid, req.params.maalid] , function (error, rows, fields) {
        if (error) {
            next(error)
        } else {
            res.status(200).json(rows).end()
        }
    });
    },

    deleteMeal(req, res, next) {
        console.log('mealcontroller.deleteMeal')

        db.query("DELETE FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?", [req.params.houseid, req.params.mealid], function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                res.status(200).json([]).end()
            }
        });
    }

}
