//
// Meal class
//
const assert = require('assert')
const ApiError = require('./ApiError')

class Meal {

    constructor(naam, beschrijving, ingredienten, allergie, prijs) {
        try {
            assert(typeof (naam) === 'string', 'naam must be a string')
            assert(typeof (beschrijving) === 'string', 'beschrijving must be a string')
            assert(typeof (ingredienten) === 'string', 'ingredienten must be a string')
            assert(typeof (allergie) === 'string', 'allergie must be a string')
            assert(typeof (prijs) === 'int', 'prijs must be a int')
            assert(naam.trim().length > 2, 'naam must be at least 3 characters')
            assert(beschrijving.trim().length > 2, 'adres must be at least 3 characters')
            assert(ingredienten.trim().length > 2, 'ingredienten must be at least 3 characters')
            assert(allergie.trim().length > 2, 'allergie must be at least 3 characters')
        }
        catch (ex) {
            throw(new ApiError(ex.toString(), 422))
        }
        
        this.naam = naam.trim()
        
        this.beschrijving = beschrijving.trim()
            
        this.ingredienten = ingredienten.trim()
        
        this.allergie = allergie.trim()

        this.prijs = prijs.trim()
    }

    getNaam(){
        return this.naam
    }

    getBeschrijving(){
        return this.beschrijving
    }

    getIngredienten(){
        return this.ingredienten
    }

    getAllergie(){
        return this.allergie
    }

    getPrijs(){
        return this.prijs
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
Meal.prototype.toString = function userToString() {
    var copy = Object.assign({}, this);
    return copy
}

module.exports = Meal;
