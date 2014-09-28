/*
 * GET home page.
 */
exports.updateRules = function(req, res){
	
	var fs = require('fs');
	var data = fs.readFileSync(__dirname + '/../rules.json'),myObj;
	try {myObj = JSON.parse(data)}
	catch (err) {console.log('There has been an error parsing your JSON.');console.log(err);}
	
	for(var key in req.body){
		console.log(key + " : " + req.body[key]);
	}
	
	for(var i = 0; i < myObj.length; i++){
		
		//update function of the route		
		myObj[i]["fonction"] = req.body["fonction_".concat(i + 1)];
		
		// update status off the route
		if(typeof req.body["isRouteEnabled_".concat(i + 1)] === "undefined"){
			myObj[i]["statut"] = "off";}
		else myObj[i]["statut"] = "on";
	}
	var data = JSON.stringify(myObj);

	fs.writeFile(__dirname + '/../rules.json',data,function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
		res.redirect('/');
	});
};
