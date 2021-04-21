'use strict'
var path = require('path');

var GenerateRandomBytes = require(path.resolve(process.cwd(),"jobs", "GenerateRandomBytes"));

/**
 * logic to generate IV
 * @returns {Promise<*>}
 * @constructor
 */
async function GenerateIv() {

    const GCM_IV_LENGTH  =  12; // in bytes

    // first we generate the iv
    // filling it with random bytes
    return await GenerateRandomBytes(GCM_IV_LENGTH);
}

module.exports = GenerateIv;