var request = require('superagent');
var should = require('should');

describe("Get JSON APi", function() {

  describe("topActiveUsers API route", function() {

    var url = "http://localhost:3000/topActiveUsers?page=1";

    it("returns status 200", function() {
   	 request.get(url).end(function(err, res){
		 
	 	res.statusCode.should.equal(200);
   	 })
    });

    it("returns topActiveUsers in json ", function() {
   	
       request.get(url).end(function(err, res){
	 	
		res.should().be.type('json');
       })
    });

  });

  describe("Get users API route ", function() {
    var url = "http://localhost:3000/users?id=1";

    it("returns status 200", function() {
   	 request.get(url).end(function(err, res){
		 
	 	res.statusCode.should.equal(200);
   	 })
    });

    it("returns users info in json ", function() {
      
      request.get(url).end(function(err, res){
		 
		 res.should().be.type('json');
      })
    
    });
  });

});

