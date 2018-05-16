
let Meal = require('../model/Meal');
let db = require('../config/db');
let Error = require('../model/ApiError');

module.exports = {

    createMeals(req, res, next) {
        console.log('mealcontroller.createMeal')

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
                
                let query = {
                    sql: "INSERT INTO maaltijd (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    values: [req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, 1, req.params.huisid],
                    timeout: 2000
                };
            
                db.query(query, function (error, rows) {
                    
                    if (error) {
                        res.status(400).json(error);
                    } else {

                        let query = {
                            sql: 'SELECT ID, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE ID = ?',
                            // Get current id
                            values: [5],
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
    },

    getAll(req, res, next) {
        console.log('mealcontroller.getAll');

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
                
                let query = {
                    sql: "SELECT ID, Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ?",
                    values: [req.params.huisid],
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

    getMealById(req, res, next) {
        console.log('mealcontroller.getMealbyID');

        let ExistHouseIDQuery = {
            sql: 'SELECT * FROM studentenhuis WHERE ID = ?',
            values: [req.params.huisid],
            timeout: 2000
        };

        db.query(ExistHouseIDQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);

            } else if (rows[0] === undefined) {
                console.log('Not able to find huisID');

                const ApiError = new Error('Not able to find huisID', 404);
                next(ApiError);

            }else {
          
                let ExistMaaltijdIDQuery = {
                    sql: 'SELECT * FROM maaltijd WHERE maaltijd.ID = ?',
                    values: [req.params.maalid],
                    timeout: 2000
                };
                db.query(ExistMaaltijdIDQuery, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('maaltijdId does not exist');
                        const ApiError = new error('maaltijdId does not exist', 404);
                        next(ApiError);
                    } else {
                  
                        let doesCombinationExistQuery = {
                            sql: 'SELECT * FROM maaltijd WHERE maaltijd.ID = ? AND maaltijd.StudentenhuisID = ?',
                            values: [req.params.maalid, req.params.huisid],
                            timeout: 2000
                        };
                        db.query(doesCombinationExistQuery, function (err, rows) {
                            if (err) {
                                res.status(400).json(err);
                            } else if (rows[0] === undefined) {
                                console.log('Combination maaltijdId/deelnemerId not found');
                                const ApiError = new error('Combination maaltijdId/deelnemerId not found', 404);
                                next(ApiError);
                            } else {
                               
                                let query = {
                                    sql: 'SELECT maaltijd.ID, maaltijd.Naam, maaltijd.Beschrijving, maaltijd.Ingredienten, maaltijd.Allergie, maaltijd.Prijs FROM maaltijd WHERE maaltijd.StudentenhuisID = ? AND maaltijd.ID = ?',
                                    values: [req.params.huisid, req.params.maalid],
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

    updateMeal(req, res, next) {
        console.log('mealcontroller.updateMeal');

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

                let ExistMealIDQuery = {
                    sql: 'SELECT * FROM maaltijd WHERE ID = ?',
                    values: [req.params.maalid],
                    timeout: 2000
                };

                db.query(ExistMealIDQuery, function (err, rows) {
            
                    if (err) {
        
                        res.status(400).json(err);
        
                    } else if (rows[0] === undefined) {
                        console.log('Not able to find maaltijdID');
        
                        const ApiError = new Error('Not able to find maaltijdID', 404);
                        next(ApiError);
        
                    } else {
                        
                        let doesCombinationExistQuery = {
                            sql: 'SELECT * FROM maaltijd WHERE maaltijd.ID = ? AND maaltijd.StudentenhuisID = ?',
                            values: [req.params.maalid, req.params.huisid],
                            timeout: 2000
                        };
                        db.query(doesCombinationExistQuery, function (err, rows) {
                            if (err) {
                                res.status(400).json(err);
                            } else if (rows[0] === undefined) {
                                console.log('Combination maaltijdId/deelnemerId not found');
                                const ApiError = new error('Combination maaltijdId/deelnemerId not found', 404);
                                next(ApiError);
                            } else {
                               
                                let query = {
                                    sql: "UPDATE maaltijd SET Naam = ?, Beschrijving = ?, Ingredienten = ?, Allergie = ?, Prijs = ? WHERE StudentenhuisID = ? AND ID = ?",
                                    values: [req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, req.params.huisid, req.params.maalid]
                                }

                                db.query(query, function (error, rows) {
                                    
                                    if (error) {
                                        res.status(400).json(error);
                                    } else {
                                        res.status(200).json(rows).end()
                                    }
                                });
                            }
                        });

                    }
                });
            }
        });
    },

    deleteMeal(req, res, next) {
        console.log('mealcontroller.deleteMeal')

        let userId = '1';

        let HouseExistIDQuery = {
            sql: 'SELECT * FROM studentenhuis WHERE ID = ?',
            values: [req.params.huisid],
            timeout: 2000
        };

        db.query(HouseExistIDQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);

            } else if (rows[0] === undefined) {
                console.log('Not able to find huisID');

                const ApiError = new Error('Not able to find huisID', 404);
                next(ApiError);

            } else {
               
                let MaaltijdExistIDQuery = {
                    sql : 'SELECT * FROM maaltijd WHERE ID = ?',
                    values: [req.params.maalid],
                    timeout : 2000
                };
                db.query(MaaltijdExistIDQuery, function(err, rows){
                    if(err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('maaltijdId does not exist');
                        const ApiError = new Error('maaltijdId does not exist', 404);
                        next(ApiError);
                    } else {
                        
                        let ExistCombinationQuery = {
                            sql : 'SELECT * FROM maaltijd WHERE ID = ? AND StudentenhuisID = ?',
                            values: [req.params.maalid, req.params.huisid],
                            timeout : 2000
                        };
                        db.query(ExistCombinationQuery, function(err, rows){
                            if(err) {
                                res.status(400).json(err);
                            } else if (rows[0] === undefined) {
                                console.log('Combination maaltijdId/deelnemerId does not exist');
                                const ApiError = new Error('Combination maaltijdId/deelnemerId does not exist', 404);
                                next(ApiError);
                            } else {
                               
                                let isUserOwnerQuery = {
                                    sql: 'SELECT * FROM maaltijd WHERE UserID = ? AND ID = ? AND StudentenhuisID = ?',
                                    values: [userId, req.params.maalid, req.params.huisid],
                                    timeout: 2000
                                };
                                db.query(isUserOwnerQuery, function (err, rows) {
                                    if (err) {
                                        res.status(400).json(err);
                                    } else if (rows[0] === undefined){
                                        console.log('User is not the owner');
                                        const ApiError = new Error('Only the owner can change studentenhuizen', 401);
                                        next(ApiError);
                                    } else {
                                        
                                        let query = {
                                            sql : 'DELETE FROM maaltijd WHERE StudentenhuisID = ? AND ID = ? AND UserID = ?',
                                            values: [req.params.huisid, req.params.maalid, userId],
                                            timeout : 2000
                                        };

                                        db.query(query, function(error, rows){
                                            if(error) {
                                               
                                                res.status(400).json(error);
                                            } else {
                                                let result = {
                                                    message : 'De maaltijd is succesvol verwijdert'
                                                };
                                                
                                                res.status(200).json(result);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

}