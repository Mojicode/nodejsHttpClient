"use strict";

const sendPost = require('./request');
const gmSM2 = require('./gmTest');

main();
async function main() {
	// nodeOriginalhttps();
	// const postData = {
	// 	pin:"12345678",
	// 	len:7
	// };
	const postData = 12345678;
	try {
		// const ret = await sendPost("http://192.168.29.120:8000/1/13", postData);
		// const keyPairs = gmSM2.deriveKeypair();
		// console.log(keyPairs);
		const originMsg = "signTest123456";
		const signedRet = await gmSM2.sign(originMsg, "4700");
		console.log(signedRet);
		const verifyRet = await gmSM2.verify(originMsg, signedRet,"47");
		console.log(verifyRet);
	} catch (error) {
		console.error(error);
	}
	
}

function nodeOriginalhttps() {
	var fs = require('fs');
	var https = require('https');
	var options = {
		hostname: 'localhost',
		port: 4433,
		path: '/', 
		method: 'GET', 
		ca: fs.readFileSync('ca-crt.pem') 
	}; 
	var req = https.request(options, function(res) { 
		res.on('data', function(data) { 
			process.stdout.write(data); 
		}); 
	}); 
	req.end();
}