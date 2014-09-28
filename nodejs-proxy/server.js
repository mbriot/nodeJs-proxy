var http = require('http');
var url = require('url');
var path = require('path');

var PROXY_HOST = '0.0.0.0';
var PROXY_PORT = 4000;

function start(route, handle) {
	http.createServer(createRequestHandler(route, handle)).listen(PROXY_PORT, PROXY_HOST);
	console.log('Server started. Listening to ' + PROXY_PORT + '.\n');
}

function createRequestHandler(route, handle) {
  return (function (req, res) {
    var options = {
      hostname: processHost(req),
      port: 80,
      path: req.url,
      method: req.method,
      headers: processHeaders(req)
    };

    console.log("\n------------");
    console.log("processing request : " + options.hostname + options.path + " " + options.method);
    console.log("------------\n");
    
    route(res, req, options, handle);
  });
}

function processHost (req) {
  var host = '';
  var originalHost = req.headers['host'];
  host = originalHost.substring(0, originalHost.indexOf(':'));
  host = host.replace('.proxy','');
  return host;
}

function processHeaders(req) {
  var headers = {};    
  for (var key in req.headers) {  
    if (req.headers.hasOwnProperty(key)) { headers[key] = req.headers[key];}
  }
  return headers; 
}
exports.start = start;
