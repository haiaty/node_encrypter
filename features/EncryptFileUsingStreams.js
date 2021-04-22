
var fs = require('fs');
var path = require('path');
var stream = require('stream');
var crypto = require('crypto');
var utils = require('util');

// we promisify the stream pipeline function
// in order to use await
var pipelineStreams = utils.promisify(stream.pipeline);

var env = require(path.resolve(process.cwd(), "jobs", "ReadEnv"));
var GenerateIv = require(path.resolve(process.cwd(),"operations", "GenerateIv"));

const ALGORITM = 'aes-256-gcm';

const GCM_TAG_LENGTH =  16; //in bytes

async function EncryptFile(filePath, destFilePath) {


    // Here we create a stream to read the content of the file.
    // the default encoding of the file's content
    // to be encrypted is UTF8
    const fileStream = fs.createReadStream(filePath);

    //======
    // Encryption part
    //=========
    var iv  = await GenerateIv();

    // initialize the cypher with configs.
    // the result will be a streamable object that you can pipe
    var cipher = crypto.createCipheriv(ALGORITM, env.ENCRYPTION_KEY, iv, {authTagLength: GCM_TAG_LENGTH})


    // we create the writable stream for the 
    // creation of the destination file
    var outputFile = path.resolve(destFilePath);

    const outputStream = fs.createWriteStream(outputFile);

  
    // then we pipeline the streams and they will be executed
    await pipelineStreams(fileStream, cipher, outputStream);


    // cipher.getAuthTag - returns a Buffer containing the authentication tag
    // that has been computed from the given data.
    var tag = cipher.getAuthTag();


    return {
        tag: tag,
        iv: iv,
        encrypted_file_path: outputFile
    }


}

module.exports = EncryptFile;
