"use strict";

// const request = require('request');
// const async = require('async');
const request = require('sync-request');

function sendPost(url, requestData){
	//sync get request result
	const response = request('POST', url, {
		json: requestData,
		timeout:3000
	});
	// console.log(response);
	const bodyRet = response.getBody('utf8');
	const bodyRetJson = JSON.parse(bodyRet);
	return bodyRetJson;
	/////////////////////////////////////////////////
	//////            can not use          //////////
	// let isResponse = false;
	// let isFirst = true;
	// let errorOut, bodyOut;
	// while(!isResponse){
	// 	if(isFirst){
	// 		isFirst = false;
	// 		request({
	// 			url: url,
	// 			method: "POST",
	// 			json: true,
	// 			headers: {
	// 				"content-type": "application/json",
	// 			},
	// 			body: requestData
	// 		}, function (error, response, body) {
	// 			if (!error && response.statusCode == 200) {
	// 				console.log(body);
	// 				bodyOut = body;
	// 				if (!body.retCode) {
	// 					// resolve(body);
	// 				} else {
	// 					// reject(body);
	// 				}
	// 			} else {
	// 				errorOut = error;
	// 				// reject(error);
	// 			}
	// 			isResponse = true;
	// 		});
	// 	}
	// }
	// if(isResponse){
	// 	console.log("have response");
	// 	if(errorOut === undefined){
	// 		return bodyOut;
	// 	} else {
	// 		throw new Error(errorOut);
	// 	}
	// }
	// console.log("skip while");
	/////////////////////////////////////////////////
	//////            can not use          //////////
	// async.waterfall([
	// 	function(callback){
	// 		request({
	// 			url: url,
	// 			method: "POST",
	// 			json: true,
	// 			headers: {
	// 				"content-type": "application/json",
	// 			},
	// 			// body: JSON.stringify(requestData)
	// 			body: requestData
	// 		}, function(error, response, body) {
	// 			if (!error && response.statusCode == 200) {
	// 				console.log(body);
	// 				callback(null, body);
	// 				// if(!body.retCode){
	// 				// 	resolve(body);
	// 				// } else {
	// 				// 	reject(body);
	// 				// }
	// 			} else {
	// 				// reject(error);
	// 				callback(error, null);
	// 			}
	// 		});
	// 	}

	// ], function(err, result){
	// 	console.log("in async.waterfall callback");
	// 	if(err){
	// 		throw new Error(err)
	// 	} else {
	// 		return result
	// 	}
	// })
	// console.log("after async.waterfall");
	/////////////////////////////////////////////////
	////use request module rather than sync-request//
	// return new Promise( function(resolve, reject) {
	// 	request({
	// 		url: url,
	// 		method: "POST",
	// 		json: true,
	// 		headers: {
	// 			"content-type": "application/json",
	// 		},
	// 		// body: JSON.stringify(requestData)
	// 		body: requestData
	// 	}, function(error, response, body) {
	// 		if (!error && response.statusCode == 200) {
	// 			console.log(body);
	// 			if(!body.retCode){
	// 				resolve(body);
	// 			} else {
	// 				reject(body);
	// 			}
	// 		} else {
	// 			reject(error);
	// 		}
	// 	});
	// })
}

module.exports = sendPost;