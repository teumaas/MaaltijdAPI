
let House = require('../model/House');
let ApiError = require('../model/ApiError');
let db = require('../config/db');

module.exports = {

    createHouse(req, res, next){
        console.log('housecontroller.createHouse');
        
        if (!huis.error){
            let query = {
                sql: 'INSERT INTO `studentenhuis` (`Naam`, `Adres`, `UserID`) VALUES (\'' + huis.adres + '\', \'' + huis.naam + '\', \'' + huis.userId + '\');',
                values: [req.body.naam, req.body.adres, 1],
                timeout: 2000
            };

            db.query(query, function (error, rows) {
                if (error) {
                    res.status(400).json(error);
                } else {
                    let id = rows.insertId;

                    let query = {
                        sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ?',
                        values: [1],
                        timeout: 2000
                    };

                    db.query(query, function (error, rows) {
                        if (error) {
                            res.status(400).json(error);
                        } else {
                            res.status(200).json(rows[0]);
                        }
                    });
                }
            });
        }
    },

    getAll(req, res, next){
        console.log('housecontroller.getAll');
        let query = {
            sql : 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` RIGHT JOIN user ON user.ID = studentenhuis.UserID',
            timeout : 2000
        };

        db.query(query, function(error, rows){
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(rows);
            }
        });
    },

    getHouseById(req, res, next){
        console.log('housecontroller.getHouseByID');
        
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `studentenhuis` WHERE studentenhuis.ID = ?',
            values: [1],
            timeout : 2000
        };
        db.query(doesHuisIdExistQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('huisId does not exist');
                const ApiError = new error('huisId does not exist', 404);
                next(ApiError);
            } else {
                let query = {
                    sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ?',
                    values: [1],
                    timeout: 2000
                };
                db.query(query, function (error, rows) {
                    if (error) {
                        res.status(400).json(error);
                    } else {
                        res.status(200).json(rows[0]);
                    }
                });
            }
        });
    },

    updateHouse(req, res, next){
        let allowed = true;
        console.log('housecontroller.updateHouse');

        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            allowed = false;
            return
        }

        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `studentenhuis` WHERE studentenhuis.ID = ?',
            values: [1],
            timeout : 2000
        };
        db.query(doesHuisIdExistQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('huisId does not exist');
                const ApiError = new error('huisId does not exist', 404);
                next(ApiError);
            } else {
                let isUserOwnerQuery = {
                    sql: 'SELECT * FROM `studentenhuis` WHERE studentenhuis.UserID = ? AND studentenhuis.ID = ?',
                    values: [2, 1],
                    timeout: 2000
                };
                db.query(isUserOwnerQuery, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('User is not the owner');
                        const ApiError = new error('Only the owner can change studentenhuizen', 401);
                        next(ApiError);
                    } else {
                        if (!huis.error) {
                            let query = {
                                sql: 'UPDATE studentenhuis SET studentenhuis.Naam = ?, studentenhuis.Adres = ? WHERE studentenhuis.ID = ? AND studentenhuis.UserID = ?',
                                values: [req.body.naam, req.body.adres, 2, 1],
                                timeout: 2000
                            };
                            console.log(query.sql);

                            db.query(query, function (error, rows) {
                                if (error) {
                                    res.status(400).json(error);
                                } else {
                                    let query = {
                                        sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ?',
                                        values: [1],
                                        timeout: 2000
                                    };

                                    db.query(query, function (error, rows) {
                                        if (error) {
                                            if (error.errno === 1062) {
                                                const ApiError = new error('Je mag deze informatie niet bewerken', 409);
                                                next(ApiError);
                                            } else {
                                                res.status(400).json(error);
                                            }
                                        } else {
                                            res.status(200).json(rows[0]);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    },

    deleteHouse(req, res, next){
        console.log('houscontroller.deleteHouse');

        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `studentenhuis` WHERE studentenhuis.ID = ?',
            values: [1],
            timeout : 2000
        };
        db.query(doesHuisIdExistQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('Not able to find huisID');
                const ApiError = new error('Not able to find huisID', 404);
                next(ApiError);
            } else {
                let isUserOwnerQuery = {
                    sql: 'SELECT * FROM `studentenhuis` WHERE studentenhuis.UserID = ? AND studentenhuis.ID = ',
                    values: [1, req.params.huisId],
                    timeout: 2000
                };
                db.query(isUserOwnerQuery, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('User is not the owner');
                        const ApiError = new error('Only the owner can change studentenhuizen', 401);
                        next(ApiError);
                    } else {
                        let query = {
                            sql: 'DELETE FROM studentenhuis WHERE studentenhuis.ID = ' + req.params.huisId,
                            timeout: 2000
                        };

                        db.query(query, function (error, rows) {
                            if (error) {
                                if (error.errno === 1062) {
                                    const ApiError = new error('Je mag deze data niet verwijderen', 409);
                                    next(ApiError);
                                } else {
                                    res.status(400).json(error);
                                }
                            } else {
                                let result = {
                                    message: 'Het studentenhuis is succesvol verwijdert'
                                };
                                res.status(200).json(result);
                            }
                        });
                    }
                });
            }
        });
    }

}
