'use strict'

var crypto = require('crypto');
var path = require('path');
var env = require(path.resolve(process.cwd(), "jobs", "ReadEnv"));
var GenerateIv = require(path.resolve(process.cwd(),"operations", "GenerateIv"));

const ALGORITM = 'aes-256-gcm';

const GCM_TAG_LENGTH =  16; //in bytes

async function EncryptText(text) {

    var iv  = await GenerateIv();

    // initialize the cypher with configs
    var cipher = crypto.createCipheriv(ALGORITM, env.ENCRYPTION_KEY, iv, {authTagLength: GCM_TAG_LENGTH})

    // Updates the cipher with data
    // The outputEncoding specifies the output format of the enciphered data.
    var encryptedFirstPart = cipher.update(text, 'utf8');

    //  cipher.final - Any remaining enciphered contents. If outputEncoding is specified, a string is returned.
    //  If an outputEncoding is not provided, a Buffer is returned.
    var encryptedSecondPart = cipher.final();

    var encrypted = Buffer.concat([encryptedFirstPart, encryptedSecondPart]);

    // cipher.getAuthTag - returns a Buffer containing the authentication tag
    // that has been computed from the given data.
    var tag = cipher.getAuthTag();

    return {
        content:  encrypted,
        tag: tag,
        iv:  iv
    };

}


module.exports = EncryptText;