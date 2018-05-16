/**
 * Testcases aimed at testing the authentication process. 
 */
const db = require("../config/db");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

let should = chai.should();
let expect = chai.expect;

chai.should();
chai.use(chaiHttp);

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken;
let firstname = "Jac";
let lastname = "Sebregts";
let email = "jsebregts@hotmail.com";
let password = "geheimpje123"

let registerCredentials = {
    "firstname"     :   firstname,
    "lastname"      :   lastname,
    "email"         :   email,
    "password"      :   password
}

let loginCredentials = {
    "email"     :   "jsebregts@hotmail.com",
    "password"  :   "geheimpje123"
}

describe('Registration', () => {

    before(function()   {
        var query = {
            sql: "INSERT INTO `user` (Voornaam, Achternaam, Email, Password)" +
                "VALUES " +
                "(\'" + firstname + "\'," +
                "\'" + lastname + "\'," +
                "\'" + email + "\'," +
                "\'" + password + "\');",
            timeout: 2000
        }

        db.query(query, function(err, rows) {
            if(err) {
                console.log("There was an error. \r\n" + err);
                
            } else  {
                console.log("Added user with email "+email+" to the db");
                
            }
        })
    });

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
        .post("/api/register")
        .send(registerCredentials)
        .end((err, res) =>  {
            res.should.have.status(200);
            res.body.should.have.property("token")
            expect(res.body.token).to.be.a("string");
            validToken = res.body.token;            
        })      
    })

    it('should return an error on GET request', (done) => {

        chai.request(server)
        .get("/api/register")
        .set("X-Access-Token", validToken)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })
        done()
    })

    it('should throw an error when the user already exists', (done) => {

        chai.request(server)
        .post("api/register")
        .send(registerCredentials)
        .end((err, res)  =>  {
            res.should.have.status(401);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(401);
            res.body.should.have.property("datetime");
        })
        done()
    })

    it('should throw an error when no firstname is provided', (done) => {
        
        var editedRegisterCredentials = {
            "lastname"      :   "Sebregts",
            "email"         :   "jsebregts@hotmail.com",
            "password"      :   "geheimpje123"
        }

        chai.request(server)
        .post("api/register")
        .send(editedRegisterCredentials)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })

        done()
    })

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        
        var editedRegisterCredentials = {
            "firstname"     :   "J",
            "lastname"      :   "Sebregts",
            "email"         :   "jsebregts@hotmail.com",
            "password"      :   "geheimpje123"
        }

        chai.request(server)
        .post("api/register")
        .send(editedRegisterCredentials)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })

        done()
    })

    it('should throw an error when no lastname is provided', (done) => {
        
        var editedRegisterCredentials = {
            "firstname"     :   "Jac",
            "email"         :   "jsebregts@hotmail.com",
            "password"      :   "geheimpje123"
        }

        chai.request(server)
        .post("api/register")
        .send(editedRegisterCredentials)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })

        done()
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {

        var editedRegisterCredentials = {
            "firstname"     :   "Jac",
            "lastname"      :   "S",
            "email"         :   "jsebregts@hotmail.com",
            "password"      :   "geheimpje123"
        }

        chai.request(server)
        .post("api/register")
        .send(editedRegisterCredentials)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })
        done()
    })

    it('should throw an error when email is invalid', (done) => {

        var editedRegisterCredentials = {
            "firstname"     :   "Jac",
            "lastname"      :   "Sebregts",
            "email"         :   "jsebregts.nl",
            "password"      :   "geheimpje123"
        }

        chai.request(server)
        .post("api/register")
        .send(editedRegisterCredentials)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })

        done()
    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {

        chai.request(server)
        .post("/api/login")
        .send(loginCredentials)
        .end((err, res) =>  {
            res.should.have.status(200);
            res.body.should.have.property("token")
            expect(res.body.token).to.be.a("string");
            validToken = res.body.token;            
        })  

        done()
    })

    it('should throw an error when email does not exist', (done) => {

        var editedLoginCredentials = {
            "email" :   "jsebregts@hotnet.net",
            "password"  :   "geheimpje123"
        }

        chai.request(server)
        .post("/api/login")
        .send(editedLoginCredentials)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })

        done()
    })

    it('should throw an error when email exists but password is invalid', (done) => {

        var editedLoginCredentials = {
            "email" :   "jsebregts@hotmail.com",
            "password"  :   "geheimpje321"
        }

        chai.request(server)
        .post("/api/login")
        .send(editedLoginCredentials)
        .end((err, res) =>  {
            res.should.have.status(412);
            res.body.should.have.property("message");
            res.body.should.have.property("code").equals(412);
            res.body.should.have.property("datetime");
        })

        done()
    })
})

module.exports = {
    validToken
}