'use strict'

var fs = require('fs');
var path = require('path');
var utils = require("util");

var readFile = utils.promisify(fs.readFile);

var DecryptText = require(path.resolve(process.cwd(), "operations", "DecryptText"));

async function DecryptFile(filePath, options) {


    // We assume that the file content is in HEX and not UTF8
    // If the file is UTF8 it will not decrypt, insteand it will
    // give errors while decrypting
    var fileContent = await readFile(filePath, 'hex');

    //======
    // Decryption part
    //=========
    return  await DecryptText(fileContent, options);

}

module.exports = DecryptFile;