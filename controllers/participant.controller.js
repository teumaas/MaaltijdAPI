
let User = require('../model/User');
var db = require('../config/db');
let Error = require('../model/ApiError');

module.exports = {

    createParticipant(req, res, next) {
        console.log('housecontroller.createHouse')

        let ExistHouseIDQuery = {
            sql: 'SELECT * FROM studentenhuis WHERE ID = ?',
            values: [req.params.huisid],
            timeout: 2000
        };

        db.query(ExistHouseIDQuery, function (err, rows) {
            
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('Not able to find huisID');

                const ApiError = new Error('Not able to find huisID', 404);
                next(ApiError);
            } else {
                
                let ExistMaaltijdIDQuery = {
                    sql: 'SELECT * FROM maaltijd WHERE ID = ?',
                    values: [req.params.maalid],
                    timeout: 2000
                };

                db.query(ExistMaaltijdIDQuery, function (err, rows) {
                    
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('Not able to find maaltijdID');
                        const ApiError = new Error('Not able to find maaltijdID', 404);
                        next(ApiError);
                    } else {
                        
                        let query = {
                            sql: 'INSERT INTO deelnemers (MaaltijdID, StudentenhuisID, UserID) VALUES (?, ?, ?)',
                            values: [req.params.maalid, req.params.huisid, 1],
                            timeout: 2000
                        };
                    
                        db.query(query, function (error, rows) {
                            
                            if (error) {
                                if (error.errno === 1062) {
                                    const ApiError = new Error('Dit account is al eerder ingeschreven', 409);
                                    next(ApiError);
                                } else {
                                res.status(400).json(error);
                                }
                            } else {
                                let id = rows.insertId;

                                //Bouwt query op
                                let query = {
                                    sql: 'SELECT user.Voornaam, user.Achternaam, user.Email FROM user WHERE user.ID = ?',
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
                });
            }
        });
    },

    getAll(req, res, next) {
        console.log('usercontroller.getAll');

        let ExistHouseIDQuery = {
            sql: 'SELECT * FROM studentenhuis WHERE ID = ?',
            values: [req.params.huisid],
            timeout: 2000
        };


        db.query(ExistHouseIDQuery, function (err, rows) {
            
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('Not able to find huisID');

                const ApiError = new Error('Not able to find huisID', 404);
                next(ApiError);
            } else {
                
                let ExistMaaltijdIDQuery = {
                    sql: 'SELECT * FROM maaltijd WHERE ID = ?',
                    values: [req.params.maalid],
                    timeout: 2000
                };

                db.query(ExistMaaltijdIDQuery, function (err, rows) {
                    
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('Not able to find maaltijdID');
                        const ApiError = new Error('Not able to find maaltijdID', 404);
                        next(ApiError);
                    } else {
                        
                        let combiIDSQuery = {
                            sql: 'SELECT * FROM deelnemers WHERE MaaltijdID = ? AND deelnemers.StudentenhuisID = ?',
                            values: [req.params.maalid, req.params.huisid],
                            timeout: 2000
                        }
                    
                        db.query(combiIDSQuery, function(error, rows) {

                            if (err) {
                                res.status(400).json(err);
                            } else if (rows[0] === undefined) {
                                console.log('maaltijdID/deelnemerID not found');
                                const ApiError = new error('maaltijdID/deelnemerID not found', 404);
                                next(ApiError);
                            } else {
                                //Bouwt query op
                                let query = {
                                    sql: 'SELECT user.Voornaam, user.Achternaam, user.Email FROM user JOIN deelnemers ON user.ID = deelnemers.UserID WHERE deelnemers.StudentenhuisID = ? AND deelnemers.MaaltijdID = ?',
                                    values: [req.params.huisid, req.params.maalid, ],
                                    timeout: 2000
                                }

                                db.query(query, function(error, rows) {
                                    if (error) {
                                        res.status(400).json(error);
                                    } else {
                                        res.status(200).json(rows);
                                    }
                                });
                        }})
                    }
                });
            }
        });
    },

    deleteParticipant(req, res, next) {
        console.log('usercontroller.deleteUser');

        let ExistHouseIDQuery = {
            sql: 'SELECT * FROM studentenhuis WHERE ID = ?',
            values: [req.params.huisid],
            timeout: 2000
        };


        db.query(ExistHouseIDQuery, function (err, rows) {
            
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('Not able to find huisID');

                const ApiError = new Error('Not able to find huisID', 404);
                next(ApiError);
            } else {
                
                let ExistMaaltijdIDQuery = {
                    sql: 'SELECT * FROM maaltijd WHERE ID = ?',
                    values: [req.params.maalid],
                    timeout: 2000
                };

                db.query(ExistMaaltijdIDQuery, function (err, rows) {
                    
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('Not able to find maaltijdID');
                        const ApiError = new Error('Not able to find maaltijdID', 404);
                        next(ApiError);
                    } else {
                        
                        let combiIDSQuery = {
                            sql: 'SELECT * FROM deelnemers WHERE MaaltijdID = ? AND deelnemers.StudentenhuisID = ?',
                            values: [req.params.maalid, req.params.huisid],
                            timeout: 2000
                        }
                    
                        db.query(combiIDSQuery, function(error, rows) {

                            if (err) {
                                res.status(400).json(err);
                            } else if (rows[0] === undefined) {
                                console.log('maaltijdID/deelnemerID not found');
                                const ApiError = new error('maaltijdID/deelnemerID not found', 404);
                                next(ApiError);
                            } else {
                                
                
                                let isUserOwnerQuery = {
                                    sql: 'SELECT * FROM `deelnemers` WHERE deelnemers.UserID = ? AND deelnemers.MaaltijdID = ? AND deelnemers.StudentenhuisID = ?',
                                    values: [1, req.params.maalid, req.params.huisid],
                                    timeout: 2000
                                };

                                db.query(isUserOwnerQuery, function (err, rows) {
                                    if (err) {
                                        res.status(400).json(err);
                                    } else if (rows[0] === undefined){
                                        console.log('Only the owner can change this!');
                                        const ApiError = new error('Only the owner can change this!', 401);
                                        next(ApiError);
                                    } else {
                                        //Bouwt query op
                                        let query = {
                                            sql : 'DELETE FROM deelnemers WHERE deelnemers.StudentenhuisID = ? AND deelnemers.MaaltijdID = ? AND deelnemers.UserID = ?',
                                            values: [req.params.huisid, req.params.maalid, 1],
                                            timeout : 2000
                                        };

                                        db.query(query, function(error, rows){
                                            if(error) {
                                                //Als de database een error gooit doe je dit
                                                res.status(400).json(error);
                                            } else {
                                                let result = {
                                                    message : 'De deelnemer verwijderd'
                                                };
                                                //Terugsturen dat het gelukt is
                                                res.status(200).json(result);
                                            }
                                        });
                                    }
                            })
                        }})
                    }
                });
            }
        });
    }
}