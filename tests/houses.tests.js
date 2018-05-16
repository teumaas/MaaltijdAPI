
const db = require("../config/db");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

let should = chai.should();
let expect = chai.expect;

chai.should();
chai.use(chaiHttp);

// let studentenhuis = {
//     "ID": 1,
//     "naam": "Lovensdijk",
//     "adres": "Lovensdijkstraat, Breda"
// }

describe('Studentenhuis API POST', () => {

    it('should return a studentenhuis when posting a valid object', (done) => {
        let studentenhuis = {
            "ID": 2,
            "naam": "Hogeschool",
            "adres": "Hogeschoollaan, Breda"
        }
        chai.request(server)
            .post('/studentenhuis')
            .send(studentenhuis)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                  
                res.body.studentenhuis.should.have.property('ID');
                res.body.studentenhuis.should.have.property('naam');
                res.body.studentenhuis.should.have.property('adres');

                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            "ID": 2,
            "adres": "Hogeschoollaan, Breda"
        }
        chai.request(server)
            .post('/studentenhuis')
            .send(studentenhuis)
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done();
            });
    })

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            "ID": 2,
            "naam": "Hogeschool"
        }
        chai.request(server)
            .post('/studentenhuis')
            .send(studentenhuis)
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done();
            });
    })
})

describe('Studentenhuis API GET all', () => {

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(server)
            .get('/studentenhuis')
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.json;
                res.body.should.be.a('array');
                  
                res.body[0].should.have.property('ID');
                res.body[0].should.have.property('naam');
                res.body[0].should.have.property('adres');
                res.body[0].ID.should.equal(1);
                res.body[0].naam.should.equal('Lovensdijk');
                res.body[0].adres.should.equal('Lovensdijkstraat, Breda');

                done()
            })
    })
})

describe('Studentenhuis API GET one', () => {

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        let studentenhuis = {
            "ID": 2,
            "naam": "Hogeschool",
            "adres": "Hogeschoollaan, Breda"
        }
        chai.request(server)
            .get('/studentenhuis/2')
            .send(studentenhuis)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.json;
                res.body.should.be.a('object');
                  
                res.body.should.have.property('ID');
                res.body.should.have.property('naam');
                res.body.should.have.property('adres');
                res.body.ID.should.equal(2);
                res.body.naam.should.equal('Hogeschool');
                res.body.adres.should.equal('Hogeschoollaan, Breda');

                done()
            })
    })

    it('should return an error when using an non-existing huisId', (done) => {
        let studentenhuis = {
            "ID": 2,
            "naam": "Hogeschool",
            "adres": "Hogeschoollaan, Breda"
        }
        chai.request(server)
            .get('/studentenhuis/' + res.body.ID)
            .send(studentenhuis)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')

                done();
            });
    })
})

describe('Studentenhuis API PUT', () => {

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        let studentenhuis = {
            "ID": 2,
            "naam": "Hogeschool",
            "adres": "Hogeschoollaan, Breda"
        }
        chai.request(server)
            .get('/studentenhuis')
            .end(function(err, res){
                chai.request(server)
                    .put('/studentenhuis/' + res.body[2].ID)
                    .send(studentenhuis)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;

                        res.body.should.be.a('object');
                        res.body.should.have.property('updated');
                        res.body.updated.should.be.a('object');
                        res.body.updated.should.have.property('ID');
                        res.body.updated.should.have.property('naam');
                        res.body.updated.should.have.property('adres');
                        res.body.updated.ID.should.equal(3);
                        res.body.updated.name.should.equal('Hogeschool');
                        res.body.updated.adres.should.equal('Hogeschoollaan, Breda');
                        done();
                    })
            })
    })

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            "ID": 3,
            "adres": "Hogeschoollaan"
        }
        chai.request(server)
            .get('/studentenhuis')
            .end((err, res) => {
                chai.request(server)
                    .put('/studentenhuis/'+res.body[1].ID)
                    .send(studentenhuis)
                    .end((err, res) => {
                        res.should.have.status(412);
                        res.body.should.be.a('object');
        
                        const error = res.body
                        error.should.have.property('message');
                        error.should.have.property('code').equals(412);
                        error.should.have.property('datetime');
        
                        done();
            });
            
        });
    })

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            "ID": 3,
            "naam": "Hogeschool"
        }
        chai.request(server)
            .get('/studentenhuis')
            .end((err, res) => {
                chai.request(server)
                    .put('/studentenhuis/'+res.body[1].ID)
                    .send(studentenhuis)
                    .end((err, res) => {
                        res.should.have.status(412);
                        res.body.should.be.a('object');
        
                        const error = res.body
                        error.should.have.property('message');
                        error.should.have.property('code').equals(412);
                        error.should.have.property('datetime');
        
                        done();
                    });
            
                });
    })
})

describe('Studentenhuis API DELETE', () => {

    it('should return a studentenhuis when posting a valid object', (done) => {
        let studentenhuis = {
            "ID": 2,
            "naam": "Hogeschool",
            "adres": "Hogeschoollaan, Breda"
        }
        chai.request(server)
            .get('/studentenhuis')
            .end(function(err, res){
                chai.request(server)
                    .del('/studentenhuis/'+res.body[1].ID)
                    .end(function(error, response){
                        response.should.have.status(200);
                        response.should.be.json;

                        response.body.should.be.a('object');
                        response.body.should.have.property('removed');
                        response.body.removed.should.be.a('object');
                        res.body.removed.should.have.property('ID');
                        res.body.removed.should.have.property('naam');
                        res.body.removed.should.have.property('adres');
                        done();
                });
            });
    })

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            "ID": 2,
            "adres": "Hogeschoollaan"
        }
        chai.request(server)
            .get('/studentenhuis')
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis/'+res.body[1].ID)
                    .send(studentenhuis)
                    .end((err, res) => {
                        res.should.have.status(412);
                        res.body.should.be.a('object');
        
                        const error = res.body
                        error.should.have.property('message');
                        error.should.have.property('code').equals(412);
                        error.should.have.property('datetime');
        
                        done();
            });
            
        });
    })

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            "ID": 2,
            "adres": "Hogeschoollaan"
        }
        chai.request(server)
            .get('/studentenhuis')
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis/'+res.body[1].ID)
                    .send(studentenhuis)
                    .end((err, res) => {
                        res.should.have.status(412);
                        res.body.should.be.a('object');
        
                        const error = res.body
                        error.should.have.property('message');
                        error.should.have.property('code').equals(412);
                        error.should.have.property('datetime');
        
                        done();
                    });
            
                });
    })
})