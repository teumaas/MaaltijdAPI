//
// Authentication controller
//
const assert = require('assert')
const ApiError = require('../model/ApiError')
const User = require('../model/User')
const auth = require('../util/auth/authentication')
const bcrypt = require('bcryptjs')
const db = require('../config/db')

// const List = require('../model/List')
// let personlist = new List()

module.exports = {

    /**
     * Authenticate the incoming request by validating the JWT token. 
     * On success, we pass further processing to the next express handler.
     * 
     * https://www.sitepoint.com/using-json-web-tokens-node-js/
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res None. The request is passed to next for further processing.
     * @param {*} next ApiError when token is invalid, or req containing logged-in user.
     */
    validateToken(req, res, next) {
        // console.log('validateToken called')

        /**
         * A token can be sent in the body of a request, via a query parameter (in the URL),
         * or as an HTTP header. We choose the header variant.
         */
        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                // Invalid token
                const error = new ApiError(err.message || err, 401)
                next(error)
            } else {
                console.log('Authenticated! Payload = ')
                console.dir(payload)

                /**
                 * The payload contains the values that were put in it via the sub-field.
                 * We could use those in our application to trace actions that a user performs, 
                 * such as monitor CRUD operations, by storing the user ID in a logging database.
                 * Example: User 12345 performed an update operation on item xyz on date dd-mm-yyyy.
                 * To do so, we attach the payload.sub (or only a part of that) to the request object.
                 * In this way, every next express handler has access to it - and could do 
                 * something smart with it.  
                 */
                req.user = payload.sub
                next()
            }
        })
    },

    /**
     * Log a user in by validating the email and password in the request.
     * Email is supposed to be more unique than a username, so we use that for identification.
     * When the email/password combination is valid a token is returned to the client. 
     * The token provides access to the protected endpoints in subsequent requests, as long 
     * as it is valid and not expired.
     * 
     * Security issue: the password is probably typed-in by the client and sent as 
     * plain text. Anyone listening on the network could read the password. The 
     * connection should therefore be secured and encrypted.
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res The token, additional user information, and status 200 when valid.
     * @param {*} next ApiError when token is invalid.
     */
    login(req, res, next) {

        // Verify that we receive the expected input
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        // Verify that the email exists and that the password matches the email.
        var query = "SELECT * FROM user WHERE Email = ? AND Password = ?";
        var result = db.query(query, [reg.body.email, req.body.password], function (error, results) {
            if(error){
                callback(error, false, null);
            }

            if(results.length > 0){
                callback(null, true, results[0].ID);
            }
            else{
                callback(null, false);
            }
        });
    },
    
    /**
     * Register a new user. The user should provide a voornaam, achternaam, emailaddress and 
     * password. The emailaddress should be unique when it exists, an error must be thrown.
     * The password will be encrypted by the Person class and must never be stored as plain text! 
     * 
     * @param {*} req The incoming request, containing valid properties.
     * @param {*} res The created user on success, or error on invalid properties.
     * @param {*} next ApiError when supplied properties are invalid.
     */
    register(req, res, next) {

        try {
            assert(typeof (req.body.voornaam) === 'string', 'voornaam must be a string.')
            assert(typeof (req.body.achternaam) === 'string', 'achternaam must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }
        
        let query = "INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES (?, ?, ?, ?)";
        db.query(query, [req.body.voornaam, req.body.achternaam, req.body.email, req.body.password], function (err, results) {
            if(err) {
                // Duplicate email found
                const error = new ApiError(err, 412)
                next(error)
            } else {
                // Unique email person was added to the list.
                // Choices we can make here: 
                // - return status OK, user must issue separate login request, or
                // - return valid token, user is immediately logged in.

                // Create an object containing the data we want in the payload.
                const payload = {
                    user: req.body.email,
                    role: 'admin, user'
                }
                // Userinfo returned to the caller.
                const userinfo = {
                    token: auth.encodeToken(payload),
                    email: req.body.email
                }
                res.status(200).json(userinfo).end()
            }
        })
    }
}

        



// personlist.add(user, (err, result) => {
//     if(err) {
//         // Duplicate email found
//         const error = new ApiError(err, 412)
//         next(error)
//     } else {
//         // Unique email person was added to the list.
//         // Choices we can make here: 
//         // - return status OK, user must issue separate login request, or
//         // - return valid token, user is immediately logged in.

//         // Create an object containing the data we want in the payload.
//         const payload = {
//             user: req.body.email,
//             role: 'admin, user'
//         }
//         // Userinfo returned to the caller.
//         const userinfo = {
//             token: auth.encodeToken(payload),
//             email: req.body.email
//         }
//         res.status(200).json(userinfo).end()
//     }
// })