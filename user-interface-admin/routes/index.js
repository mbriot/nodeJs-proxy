exports.index = function(req, res){
	var fs = require('fs'),readline = require('readline');

	var data = fs.readFileSync(__dirname + '/../rules.json'),myObj;
	myObj = JSON.parse(data)
	
	var redirection = new Array() ;
	var rd = readline.createInterface({
		input: fs.createReadStream('./../nodejs-proxy/requestHandlers.js'),
		output: process.stdout,
		terminal: false
	});
	rd.on('line', function(line) {
		var redirectionPattern = /exports\..*\s*=\s*([^;]+)/i;
		if (redirectionPattern.test(line)) {
			var redirectionItem = redirectionPattern.exec(line)[1];
			redirection.push(redirectionItem);
		}
	}).on('close', function() {
		res.render('index.ejs', { actualRules : myObj , redirection : redirection});
	});;


};
