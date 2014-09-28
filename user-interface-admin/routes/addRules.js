exports.addRules = function(req, res){
	
	var fs = require('fs');
	var data = fs.readFileSync(__dirname + '/../rules.json'),myObj;
	try {myObj = JSON.parse(data)}
	catch (err) {console.log('There has been an error parsing your JSON.');console.log(err);}
	
	var newId = myObj.length + 1 ;
	var newRule = '{"id":' + newId + ',"host":"' + req.body["addRuleHost"] + '","service":"' + req.body["addRuleService"] + '","method":"' + req.body["addRuleMethod"] + '","fonction":"' + req.body["addRuleRedirection"] + '","statut":"on"}';
	
	var data = JSON.stringify(myObj);
	data = data.substring(0, data.length - 1) + "," + newRule + "]" ;

	fs.writeFile(__dirname + '/rules.json',data,function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
		res.redirect('/');
	});
};
