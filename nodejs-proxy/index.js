var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

console.log('\nNodeJS Proxy.')

var handle = {} ;
handle['nominalRequest'] = requestHandlers.nominalRequest;
handle['error500'] = requestHandlers.error500;
handle['error404'] = requestHandlers.error404;

server.start(router.route, handle);

