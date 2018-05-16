
const db = require("../config/db");
const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const server = require('../server');

let should = chai.should();
let expect = chai.expect;

chai.should();
chai.use(chaiHttp);

// let maaltijd = {
//     "ID": 1,
//     "Naam": "Zuurkool met worst",
//     "Beschrijving": "Zuurkool a la Montizaan, specialiteit van het huis.",
//     "Ingredienten": "Zuurkool, worst, spekjes",
//     "Allergie": "Lactose, gluten",
//     "Prijs": 5    
// }

describe('Maaltijd API POST', () => {

    it('should return a maaltijd when posting a valid object', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .post('/studentenhuis/'+ res.body[1].ID +'/maaltijd')
            .send(maaltijd)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                  
                res.body.maaltijd.should.have.property('ID');
                res.body.maaltijd.should.have.property('Naam');
                res.body.maaltijd.should.have.property('Beschrijving');
                res.body.maaltijd.should.have.property('Ingredienten');
                res.body.maaltijd.should.have.property('Allergie');
                res.body.maaltijd.should.have.property('Prijs');

                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .post('/studentenhuis/'+ res.body[1].ID +'/maaltijd')
            .send(maaltijd)
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

    it('should throw an error when beschrijving is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .post('/studentenhuis/'+ res.body[1].ID +'/maaltijd')
            .send(maaltijd)
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

    it('should throw an error when ingredienten is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .post('/studentenhuis/' + res.body[1].ID +'/maaltijd')
            .send(maaltijd)
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

    it('should throw an error when allergie is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Prijs": 5    
        }
        chai.request(server)
            .post('/studentenhuis/'+ res.body[1].ID +'/maaltijd')
            .send(maaltijd)
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

    it('should throw an error when prijs is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten"  
        }
        chai.request(server)
            .post('/studentenhuis/'+ res.body[1].ID +'/maaltijd')
            .send(maaltijd)
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

describe('Maaltijd API GET all', () => {

    it('should return all maaltijden when using a valid token', (done) => {
        chai.request(server)
            .get('/studentenhuis'+ res.body[1].ID+'maaltijd')
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.json;
                res.body.should.be.a('array');
                  
                res.body[0].should.have.property('ID');
                res.body[0].should.have.property('Naam');
                res.body[0].should.have.property('Beschrijving');
                res.body[0].should.have.property('Ingredienten');
                res.body[0].should.have.property('Allergie');
                res.body[0].should.have.property('Prijs');

                res.body[0].ID.should.equal(1);
                res.body[0].Naam.should.equal('Zuurkool met worst');
                res.body[0].Beschrijving.should.equal('Zuurkool a la Montizaan, specialiteit van het huis.');
                res.body[0].Ingredienten.should.equal('Zuurkool, worst, spekjes');
                res.body[0].Allergie.should.equal('Lactose, gluten');
                res.body[0].Prijs.should.equal(5);

                res.body[1].ID.should.equal(2);
                res.body[1].Naam.should.equal('Zuurkool met worst');
                res.body[1].Beschrijving.should.equal('Zuurkool a la Sebregts, specialiteit van het huis.');
                res.body[1].Ingredienten.should.equal('Zuurkool, worst, spekjes');
                res.body[1].Allergie.should.equal('Lactose, gluten');
                res.body[1].Prijs.should.equal(5);

                done()
            })
    })
})

describe('Maaltijd API GET one', () => {

    it('should return the correct maaltijd when using an existing huisId', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body[1].ID + 'maaltijd' + res.body[1])
            .send(maaltijd)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.json;
                res.body.should.be.a('object');
                  
                res.body.should.have.property('ID');
                res.body.should.have.property('Naam');
                res.body.should.have.property('Beschrijving');
                res.body.should.have.property('Ingredienten');
                res.body.should.have.property('Allergie');
                res.body.should.have.property('Prijs');

                res.body.ID.should.equal(2);
                res.body.Naam.should.equal('Zuurkool met worst');
                res.body.Beschrijving.should.equal('Zuurkool a la Sebregts, specialiteit van het huis.');
                res.body.Ingredienten.should.equal('Zuurkool, worst, spekjes');
                res.body.Allergie.should.equal('Lactose, gluten');
                res.body.Prijs.should.equal(5);

                done()
            })
    })

    it('should return an error when using an non-existing huisId', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis/'+res.body.studentenhuis.ID + '/maaltijd'+res.body.maaltijd.ID)
            .send(maaltijd)
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

describe('Maaltijd API PUT', () => {

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body[1].ID + 'maaltijd' + res.body[1])
            .end(function(err, res){
                chai.request(server)
                    .put('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[2].ID)
                    .send(maaltijd)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;

                        res.body.should.be.a('object');
                        res.body.should.have.property('updated');
                        res.body.updated.should.be.a('object');
                        res.body.updated.should.have.property('ID');
                        res.body.updated.should.have.property('Naam');
                        res.body.updated.should.have.property('Beschrijving');
                        res.body.updated.should.have.property('Ingredienten');
                        res.body.updated.should.have.property('Allergie');
                        res.body.updated.should.have.property('Prijs');

                        res.body.updated.ID.should.equal(3);
                        res.body.updated.Naam.should.equal('Zuurkool met worst');
                        res.body.updated.Beschrijving.should.equal('Zuurkool a la Sebregts, specialiteit van het huis.');
                        res.body.updated.Ingredienten.should.equal('Zuurkool, worst, spekjes');
                        res.body.updated.Allergie.should.equal('Lactose, gluten');
                        res.body.updated.Prijs.should.equal(5);
                        done();
                    })
            })
    })

    it('should throw an error when naam is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .put('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when beschrijving is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .put('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when ingredienten is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .put('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when allergie is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .put('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when prijs is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten"
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .put('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

describe('Maaltijd API DELETE', () => {
    
    it('should return a maaltijd when posting a valid object', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd')
            .end(function(err, res){
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .end(function(error, response){
                        response.should.have.status(200);
                        response.should.be.json;

                        response.body.should.be.a('object');
                        response.body.should.have.property('removed');
                        response.body.removed.should.be.a('object');
                        res.body.removed.should.have.property('ID');
                        res.body.removed.should.have.property('Naam');
                        res.body.removed.should.have.property('Beschrijving');
                        res.body.removed.should.have.property('Ingredienten');
                        res.body.removed.should.have.property('Allergie');
                        res.body.removed.should.have.property('Prijs');
                        done();

                });
            });
    })

    it('should throw an error when naam is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when beschrijving is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when ingredienten is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Allergie": "Lactose, gluten",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when allergie is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Prijs": 5    
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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

    it('should throw an error when prijs is missing', (done) => {
        let maaltijd = {
            "ID": 2,
            "Naam": "Zuurkool met worst",
            "Beschrijving": "Zuurkool a la Sebregts, specialiteit van het huis.",
            "Ingredienten": "Zuurkool, worst, spekjes",
            "Allergie": "Lactose, gluten"
        }
        chai.request(server)
            .get('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
            .end((err, res) => {
                chai.request(server)
                    .del('/studentenhuis'+ res.body.studentenhuis.ID + '/maaltijd'+res.body[1].ID)
                    .send(maaltijd)
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