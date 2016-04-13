var users = require("../models/database")();

var topActiveUsers ={
	
	getUser: function(req, res){
		
		// Grab user id  from http request
		var id = req.query.id;
		users.getUsersInfo(id, function(rows) {
			// Stream results back
			res.json(rows);
		});
	}
};

module.exports = topActiveUsers;


