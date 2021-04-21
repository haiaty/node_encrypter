'use strict'

var crypto = require('crypto');
var path = require('path');
var env = require(path.resolve(process.cwd(), "jobs", "ReadEnv"));

const ALGORITM = 'aes-256-gcm';

const GCM_TAG_LENGTH =  16; //in bytes

/**
 *
 * @param text
 * @param options
 * @returns {Promise<*>}
 * @constructor
 */
async function DecryptText(text, options) {

    // NOTE: the IV is a buffer and we set that buffer as an Uint8Array typedarray. why?
    // because we eant to work byte per byte
    var decipher = crypto.createDecipheriv(ALGORITM, env.ENCRYPTION_KEY, new Uint8Array(options.iv), {authTagLength: GCM_TAG_LENGTH})

    decipher.setAuthTag(options.tag);

    // the input ciphered text is hex encoded
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');

    return dec;
}


module.exports = DecryptText;