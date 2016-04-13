var users = require("../models/database")();

var pageNumber = {
	
	getNumber: function(req, res){
		// Grab data from http request
		var data = req.query.page;
		users.getTopActiveUsers(data, function(rows) {
			// Stream results back
			res.json(rows);
		});
	}
};

module.exports = pageNumber;