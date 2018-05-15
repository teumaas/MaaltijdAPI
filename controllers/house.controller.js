
let House = require('../model/House');
let db = require('../config/db');

module.exports = {

    createHouse(req, res, next) {
        console.log('housecontroller.createHouse')
       
        db.query("INSERT INTO studentenhuis (Naam, Adres, UserID) VALUES (?, ?, 1)", req.body.naam, req.body.adres, function (err, rows, fields) {
            if (err) {
                const error = new ApiError(err, 412)
                next(error)
            } else {
                res.status(200).json('Success!').end()
            }
        });
    },

    getAll(req, res, next) {
        console.log('housecontroller.getAll');
        
        db.query("SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, ' ', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID", function (err, rows, fields) {
            if (err) {
                const error = new ApiError(err, 412)
                next(error)
            } else {
                res.status(200).json(rows).end()
            }
        });
    },

    getHouseById(req, res, next) {
        const id = req.params.id;

        console.log('housecontroller.getHouseID');
        db.query("SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, ' ', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE user.ID = ?", id, function (err, rows, fields) {
            if (err) {
                const error = new ApiError(err, 412)
                next(error)
            } else {
                res.status(200).json(rows[0]).end()
            }
        });

    },

    updateHouse(req, res, next) {
        console.log('housecontroller.updateHouse');

        db.query("UPDATE studentenhuis SET Naam = ?, Adres = ?) WHERE ID = ?", req.body.naam, req.body.adres, req.params.id, function (err, rows, fields) {
            if (err) {
                const error = new ApiError(err, 412)
                next(error)
            } else {
                res.status(200).json(rows[0]).end()
            }
        });
    },

    deleteHouse(req, res, next) {
        console.log('housecontroller.deleteHouse')

        db.query("DELETE FROM studentenhuis WHERE ID = ?", req.params.id, function (err, rows, fields) {
            if (err) {
                const error = new ApiError(err, 412)
                next(error)
            } else {
                res.status(200).json('Info dat de verwijdering is gelukt.').end()
            }
        });

    }

}
