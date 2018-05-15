
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')


chai.should()
chai.use(chaiHttp)

// let studentenhuis = {
//     "ID": 1,
//     "naam": "Lovensdijk",
//     "adres": "Lovensdijkstraat, Breda"
// }

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        let studentenhuis = {
            "ID": 1,
            "naam": "Lovensdijk",
            "adres": "Lovensdijkstraat, Breda"
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
            "ID": 1,
            "adres": "Lovensdijkstraat, Breda"
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
            "ID": 1,
            "naam": "Lovensdijk"
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
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

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
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return an error when using an non-existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
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
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
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