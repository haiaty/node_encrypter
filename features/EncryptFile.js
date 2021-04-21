
var fs = require('fs');
var path = require('path');

var utils = require('util');
var readFile = utils.promisify(fs.readFile);
var writeFile = utils.promisify(fs.writeFile);

var EncryptText = require(path.resolve(process.cwd(), "operations", "EncryptText"));

async function EncryptFile(filePath, destFilePath) {


    // Here we read the content of the file.
    // If the file is large, then we may consider using a stream buffer
    // the default encoding of the file's content
    // to be encrypted is UTF8
    var fileContent = await readFile(filePath);

    //======
    // Encryption part
    //=========
    var result = await EncryptText(fileContent);

    //======
    // Write encrypted data
    //=========
    var outputFile = path.resolve(destFilePath);

    // the encrypted content is a Buffer. We will
    // write it to a file encoded as HEX
    await writeFile(outputFile, result.content, {encoding: "hex"});

    return Object.assign(result,{encrypted_file_path: outputFile});
}

module.exports = EncryptFile;