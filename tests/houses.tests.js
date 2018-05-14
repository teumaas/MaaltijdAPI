
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/status')
            .send({
                "teskt":{
                    "tekst": "Tekst"
                }
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('teskt').which.is.an('object')
                const name = response.name
                name.should.have.property('tekst').equals('teskt')
                done()
            })
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "name": "Tekst",
                "address": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('teskt').which.is.an('object')
                const name = response.name
                name.should.have.property('tekst').equals('teskt')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "name": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')

                done();
            });
    })

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "address": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')

                done();
            });
    })
})

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/status')
            .send({
                "token": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')

                done();
            });
    })

    it('should return all studentenhuizen when using a valid token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/status')
            .send({
                "token": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')

                done();
            });
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "houseId": "Nummer",
                "name": "Tekst",
                "address": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('tekst').which.is.an('object')
                const name = response.name
                name.should.have.property('tekst').equals('teskt')
                done()
            })
    })

    it('should return an error when using an non-existing huisId', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "houseId": "Tekst"
            })
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
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/status')
            .send({
                "token": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')

                done();
            });
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "houseId": "Nummer",
                "name": "Tekst",
                "address": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('tekst').which.is.an('object')
                const name = response.name
                name.should.have.property('tekst').equals('teskt')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "token": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')

                done();
            });
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "houseId": "Nummer",
                "name": "Tekst",
                "address": "Tekst"
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('tekst').which.is.an('object')
                const name = response.name
                name.should.have.property('tekst').equals('teskt')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "name": "Tekst"
            })
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

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
            .post('/api/houses')
            .send({
                "name": "Tekst"
            })
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