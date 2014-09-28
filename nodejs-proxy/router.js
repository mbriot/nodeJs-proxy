function route(response,request,options,handle){

	var fs = require('fs');
	var data = fs.readFileSync(__dirname + '/../user-interface-admin/rules.json'),rules;
	rules = JSON.parse(data)

	var serviceAlreadyRequested = false;
	for(var i = 0; i < rules.length; i++) {
		if (rules[i].statut == "on" &&
			rules[i].host == options.hostname &&
			rules[i].method == request.method &&
			rules[i].path == options.path){
			
			console.log("Intercepting the service.");

			handle[rules[i].fonction](response);
			serviceAlreadyRequested = true;
		}
	}

	if(!serviceAlreadyRequested){
		delete options.headers['host'];
		delete options.headers['content-length'];
		handle['nominalRequest'](response, request, options);		
	}
}


exports.route = route ;
