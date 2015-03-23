
var Q = require("q");
var randomOrg = require("node-random");
var randomJs = require("random-js");

/** 
 * Generates a single random number. Based on provided arguments, either uses offline or online randomization.
 * @param {number} min Minimum number
 * @param {number} max Maximum number 
 * @returns {Q.Promise<number>} On success resolves to a single number
 */
function random(min, max) {
    var deferred = Q.defer();

    if (random.isOffline) {
        // Use random-js, wrap non sync behavior into a async promise wrapper
        // Create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
        var engine = randomJs.engines.mt19937().autoSeed();
        // Create a distribution that will consistently produce integers within inclusive range [min, max].
        var distribution = randomJs.integer(min, max);
        deferred.resolve(distribution(engine));
    } else {
        console.log("Querying random.org..");
        // Online, use random.org :) -- async
        Q.ninvoke(randomOrg, "integers", { number: 1, minimum: min, maximum: max })
            .done(deferred.resolve, deferred.reject)
    }

    return deferred.promise;
}
random.isOffline = true;

module.exports = random;