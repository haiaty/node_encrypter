1) From the script/code that you want to decrypt, 
take the output json generated from encrypt.js: 

node encrypt.js <sourcefile> <destinationOfEncryptedContentFilePath>

2) convert the "IV" from HEX to binary

3) convert the "tag" from HEX to binary

4) Read the content of the encrypted file as bytes (don't use utf8 as encoding because the file was saved as an hex string)

5) use these to decrypt



NOTE: check the ./decrypt.js for NodeJs version
or resources/decrypt.php for a php version

