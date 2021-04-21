<?php

$encryptedContentFilePath = "/home/output.enc";
$command =  "node encrypt.js ./test.txt $encryptedContentFilePath";


exec("$command 2>&1" , $output, $exitCode);
$json = json_decode($output[0], true);





$handle = fopen($encryptedContentFilePath, "r");
$ciphertextAsBytes = fread($handle, filesize($encryptedContentFilePath));
fclose($handle);



$key = "dRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t"; //random generated key. don't use it anywhere. it is hust a sample
$cipher = 'aes-256-gcm';

$tag_length = 16;
$iv = $json["iv"];
$tag = $json["tag"];

$decrypted = openssl_decrypt($ciphertextAsBytes, $cipher, $key, OPENSSL_RAW_DATA, hex2bin($iv), hex2bin($tag));

var_dump($decrypted);