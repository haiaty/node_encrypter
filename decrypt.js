'use strict'

var path = require('path');

var Encrypt = require(path.resolve(process.cwd(), "encrypt"));
var DecryptFile = require(path.resolve(process.cwd(), "features", "DecryptFile"));


async function main() {

    var result = await Encrypt("./test.txt", "./output.enc");

    // we take the bytes from
    // the hex string for the tag and the iv
    var tag = Buffer.from(result.tag, "hex");

    var iv = Buffer.from(result.iv, "hex");


    var decryptedContent = await DecryptFile("./output.enc", {tag: tag, iv: iv});

    console.log(decryptedContent);


}





main();