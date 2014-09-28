var http = require('http');

function nominalRequest(response, request, options) {
	console.log("\nRouting nominal request.\n");
	
	// --- Preparing forward request --------------------------------------------
	
	var forwardRequest = http.request(options, function(forwardResponse) {
		var bodyResponse = '';
		forwardResponse.setEncoding('utf8');
		
		forwardResponse.on('data', function (chunk) {	bodyResponse += chunk; });
		
		forwardResponse.on('end', function () {
			response.writeHead(forwardResponse.statusCode, forwardResponse.headers);
			response.end(bodyResponse);
		});
		
		forwardResponse.on('error', function () {
			response.writeHead(forwardResponse.statusCode, forwardResponse.headers);
			response.end(bodyResponse);
		});
	});
	
	// --- Processing original request ------------------------------------------
	
	var bodyRequest = '';
	
	request.on('data', function (data) {
		bodyRequest += data.toString();
		forwardRequest.write(bodyRequest);
	});
	
	request.on('end', function () { forwardRequest.end(); });
}

function error500(response) {
	this.
	response.writeHead(500);
	response.write('Inter Server Error');
	response.end();
}

function error404(response) {
	response.writeHead(404);
	response.write('404 Not Found');
	response.end();
}

exports.nominalRequest = nominalRequest ;
exports.error500 = error500 ;
exports.error404 = error404 ;