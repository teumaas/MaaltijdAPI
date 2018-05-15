//
// House class
//
const assert = require('assert')
const ApiError = require('./ApiError')

// To verify that validateEmail works as expected:
// console.log('testing email: ' + validateEmail('test.server@test.com'))

function validateEmail(email) {
    const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
}

class House {

    constructor(naam, adres, contact, email) {
        try {
            assert(typeof (naam) === 'string', 'naam must be a string')
            assert(typeof (adres) === 'string', 'adres must be a string')
            assert(typeof (contact) === 'string', 'contact must be a string')
            assert(typeof (email) === 'string', 'email must be a string')
            assert(naam.trim().length > 2, 'naam must be at least 3 characters')
            assert(adres.trim().length > 2, 'adres must be at least 3 characters')
            assert(contact.trim().length > 2, 'contact must be at least 3 characters')
            assert(validateEmail(email.trim()), 'email must be a valid emailaddress')
        }
        catch (ex) {
            throw(new ApiError(ex.toString(), 422))
        }
        
        this.naam = naam.trim()
        
        this.adres = adres.trim()
            
        this.contact = contact.trim()
        
        this.email = email.trim()
    }

    getNaam(){
        return this.naam
    }

    getAdres(){
        return this.adres
    }

    getContact(){
        return this.contact
    }

    getEmail(){
        return this.email
    }
}

/**
 * Override the toString method. Make a copy of the current object and 
 * delete the password from it, to avoid sending the password to the caller.
 * This only works when calling console.log(user.toString())! 
 * Using console.log(user) will still print the complete object including 
 * the (encrypted) password!
 * 
 * We use a regular function here instead of a fat-arrow function, since 
 * a fat-arrow (lambda) expression has no access to 'this', which we do need here.
 */
House.prototype.toString = function userToString() {
    var copy = Object.assign({}, this);
    return copy
}

module.exports = House;
