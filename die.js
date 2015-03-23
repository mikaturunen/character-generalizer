
var random = require("./random");

/**
 * Dice module for rolling a single die.
 * @module Die
 */
var die = {
    /**
     * Roll a die.
     * @param  {{
     *         dice: number;
     *         max: number;
     *         add: number;
     * }} die The die to roll. Contains properties dice for how many dice and max for what the max of the dice is.
     * @return {Q.Promise<number>} Resolves on true to a random number. Rejects on error with message.   
     */
    roll: (die) => {
        if (die.dice === undefined) {
            die.dice = 1;
        }
        if (die.number === undefined) {
            die.add = 0;
        }

        // NOTE if we want to throw 1d40, our random starts from 0 and yet we want to use the dice thrower as 1d40
        //      so { dice: 1, number: 40 } -> this will result into a single dice throw in th range of [0, 39], we
        //      add one to it to make it between 1-40. This works for us a bit better. We'll look into producing
        //      zeroes if we have the need for that type if dice in the future.
        die.max = die.max + 1;

        var deferred = Q.defer();
        
        random(die.min, die.max)
            .done(result => deferred.resolve(result + die.add), deferred.reject);

        return deferred.promise;
    }
}

module.exports = die;