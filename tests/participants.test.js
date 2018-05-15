
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')


chai.should()
chai.use(chaiHttp)

// let deelnemer = {
//     "ID": 1,
//     "Voornaam": "Jan",
//     "Achternaam": "Smit",
//     "Email": "jsmit@server.nl"
// }

describe('Deelnemer API POST', () => {

    it('should return a deelnemer when posting a valid object', (done) => {
        let deelnemer = {
            "ID": 2,
            "Voornaam": "Kees",
            "Achternaam": "Smit",
            "Email": "ksmit@server.nl"
        }
        chai.request(server)
            .post('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .send(deelnemer)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                  
                res.body.deelnemer.should.have.property('ID');
                res.body.deelnemer.should.have.property('Voornaam');
                res.body.deelnemer.should.have.property('Achternaam');
                res.body.deelnemer.should.have.property('Email');

                done()
            })
    })

    it('should throw an error when voornaam is missing', (done) => {
        let deelnemer = {
            "ID": 2,
            "Achternaam": "Smit",
            "Email": "ksmit@server.nl"
        }
        chai.request(server)
            .post('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .send(deelnemer)
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

    it('should throw an error when achternaam is missing', (done) => {
        let deelnemer = {
            "ID": 2,
            "Voornaam": "Kees",
            "Email": "ksmit@server.nl"
        }
        chai.request(server)
            .post('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .send(deelnemer)
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

    it('should throw an error when email is missing', (done) => {
        let deelnemer = {
            "ID": 2,
            "Voornaam": "Kees",
            "Achternaam": "Smit",
        }
        chai.request(server)
            .post('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .send(deelnemer)
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

describe('Deelnemer API GET all', () => {

    it('should return all deelnemers when using a valid token', (done) => {
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.json;
                res.body.should.be.a('array');
                  
                res.body[0].should.have.property('ID');
                res.body[0].should.have.property('Voornaam');
                res.body[0].should.have.property('Achternaam');
                res.body[0].should.have.property('Email');

                res.body[0].ID.should.equal(1);
                res.body[0].Voornaam.should.equal('Jan');
                res.body[0].Achternaam.should.equal('Smit')
                res.body[0].Email.should.equal('jsmit@server.nl');
                done()
            })
    })
})

describe('Deelnemer API DELETE', () => {
    it('should return a deelnemer when posting a valid object', (done) => {
        let deelnemer = {
            "ID": 2,
            "Voornaam": "Kees",
            "Achternaam": "Smit",
            "Email": "ksmit@server.nl"
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .end(function(err, res){
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers' + res.body[1].ID)
                    .end(function(error, response){
                        response.should.have.status(200);
                        response.should.be.json;

                        response.body.should.be.a('object');
                        response.body.should.have.property('removed');
                        response.body.removed.should.be.a('object');
                        res.body.removed.should.have.property('ID');
                        res.body.removed.should.have.property('Voornaam');
                        res.body.removed.should.have.property('Achternaam');
                        res.body.removed.should.have.property('Email');
                        done();
                });
            });
    })

    it('should throw an error when voornaam is missing', (done) => {
        let deelnemer = {
            "ID": 2,
            "Achternaam": "Smit",
            "Email": "ksmit@server.nl"
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers'+res.body[1].ID)
                    .send(deelnemer)
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

    it('should throw an error when achternaam is missing', (done) => {
        let deelnemer = {
            "ID": 2,
            "Voornaam": "Kees",
            "Email": "ksmit@server.nl"
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers'+res.body[1].ID)
                    .send(deelnemer)
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

    it('should throw an error when email is missing', (done) => {
        let deelnemer = {
            "ID": 2,
            "Voornaam": "Kees",
            "Achternaam": "Smit",
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers')
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+ res.body.maaltijd.ID + '/deelnemers'+res.body[1].ID)
                    .send(deelnemer)
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