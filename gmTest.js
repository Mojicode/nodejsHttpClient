"use strict";

const sendPost = require('./request');
const async = require('async');
// const sdServerUrl = "http://192.168.29.120:8000"
const sdServerUrl = "http://192.168.1.116:8000"

const gmSM2 = {
	deriveKeypair: function(entropy) {
		const genKeyUrl = sdServerUrl + "/2/21";
		const getPubUrl = sdServerUrl + "/2/22";
		const postData = { containerIndex:0 };
		var privateKey = "", publicKey = "";
		try {
			// async.waterfall([
			// 	function genInsideKey(callback) {
			// 		const retGenKey = sendPost(genKeyUrl, postData);
			// 		callback(null, retGenKey);
			// 	},
			// 	function getPubKey(retGenKey, callback) {
			// 		const retGetPub = sendPost(getPubUrl, postData);
			// 		callback(null, retGetPub);
			// 	}], function(error, result) {
			// 		console.log(result.retCode);
			// 		publicKey = result.publicKey;
			// })
			// const retGenKey = await sendPost(genKeyUrl, postData);
			// const retGetPub = await sendPost(getPubUrl, postData);
			const retGenKey = sendPost(genKeyUrl, postData);
			const retGetPub = sendPost(getPubUrl, postData);
			privateKey = "4700";
			console.log(retGetPub.retCode);
			publicKey = retGetPub.publicKey;
		} catch (error) {
			throw new Error(error);
		}
		return {privateKey, publicKey}
	},
	sign: function(message, privateKey) {
		const sm3HashUrl = sdServerUrl + "/3";
		const sm2SignUrl = sdServerUrl + "/2/24";
		const postMessage = {
			data: message,
			dataLen: message.length
		}
		try {
			const messageHash = sendPost(sm3HashUrl, postMessage);
			const postData4Sign = {
				data: messageHash.hashData,
				dataLen:32
			}
			const signRet = sendPost(sm2SignUrl, postData4Sign);
			return signRet.signedData;
		} catch (error) {
			throw new Error(error);
		}
	},
	verify: function(message, signature, publicKey) {
		const sm3HashUrl = sdServerUrl + "/3";
		const sm2VerifyUrl = sdServerUrl + "/2/25";
		const postMessage = {
			data: message,
			dataLen: message.length
		}
		try {
			const messageHash = sendPost(sm3HashUrl, postMessage);
			const postData4Verify = {
				data: messageHash.hashData,
				dataLen:32,
				signedData: signature,
				signedDataLen: signature.length
			}
			const verifyRet = sendPost(sm2VerifyUrl, postData4Verify);
			return verifyRet.retCode ? false : true;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = gmSM2;