'use strict'

var path = require('path');
var fs = require('fs');

var EncryptFile = require(path.resolve(process.cwd(),"features", "EncryptFile"));

async function main(sourceFilePath, destFilePath) {

    //================
    // perform the encryption of the
    // source file taken as argument
    //==================
    var result = await EncryptFile(sourceFilePath, destFilePath);

    //================
    // return the encrypted file path and the the tag
    // (needed on decryption side)
    //==================
    var output = {};

    //await writeFile("tag.enc", result.tag);
    // NOTE: tag here is already a buffer, so we don't create a buffer from it
    // as we do for iv, which is an typedarrray
    output.tag = result.tag.toString("hex").toUpperCase();


    // since iv is a typed array, we create a buffer from it
    // in order to get the HEX encoding
    output.iv = Buffer.from(result.iv).toString('hex').toUpperCase();
    //await writeFile("iv.enc", Buffer.from(result.iv));


    output.encrypted_file_path = result.encrypted_file_path;
    output.encrypted_content_enconding = "hex";


    return output;
}


if (require.main === module) {

    (async function () {
        try {

            //================
            // Takes source file to encrypt from
            // commad line arguments
            //==================
            var [bin, sourcePath, ...args] = process.argv;

            var sourceFilePath = args[0];

            if(sourceFilePath === undefined ) {
                throw Error("You didnt pass a correct source file to encrypt");
            }

            sourceFilePath = path.resolve(process.cwd(), sourceFilePath);

            if (! fs.existsSync(sourceFilePath)) {
                throw Error("The source file does not exist");
            }

            var destFilePath = args[1];

            if(destFilePath === undefined ) {
                throw Error("You didnt pass a correct destination path to put the encrypted content");
            }



            var output = await main(sourceFilePath,destFilePath );

            console.log(JSON.stringify(output));

            process.exit(0);
        } catch (ex) {
            console.log(JSON.stringify(ex.message));
            process.exit(1);
        }

    })();

} else {
    // Required by other files
    module.exports = main;
}