/*database set up*/

var pg = require("pg");
var conString = "pg://maki:makizar@localhost:5432/jobbatical";
var connection = new pg.Client(conString);
// // Get a Postgres client from the connection pool
connection.connect(function(err) {
	
  if(err) {
    return console.error('could not connect to postgres', err);
  }
});

module.exports = function() {
	
	return {
		getTopActiveUsers: function(id, callback){
		
		    // SQL Query > Select Data
		    var query =  'SELECT json_agg(t) FROM (';
			   query += 'SELECT id, (SELECT created_at FROM users u WHERE u.id= users.id ) as createdAt, name, ';
  			   query += '(SELECT COUNT(*) FROM applications WHERE user_id= users.id) as count, ';
    		    	   query += '(SELECT array_to_json(array_agg(row_to_json(d)))';
			   query += 'FROM ( SELECT name FROM listings ORDER BY created_at LIMIT 3)';
    		    	   query += 'd  ) as listings FROM users  LIMIT 5 OFFSET '+id+' ) t;';
			   
			    // Get a Postgres client from the connection pool
   			   var sql = connection.query(query); 
			
   	          // Stream results back one row at a time
   	          sql.on('row', function(row) {
   	             callback(row.json_agg);
   	          });
			
	          // After all data is returned, close connection 
	         sql.on('end', function() {});
			
		},
          		  
		getUsersInfo: function(id, callback) {

		    // SQL Query > Select Data
 		    var query  = 'SELECT row_to_json(t) FROM ';
 			   query += ' ( SELECT id, (SELECT created_at FROM users u WHERE u.id= users.id ) as createdAt, name,';
   			   query += '(SELECT array_to_json(array_agg(row_to_json(c)))';
     		   query += 'FROM ( SELECT id, (SELECT created_at FROM companies comp INNER JOIN teams tea ON comp.id= tea.company_id WHERE   tea.user_id= users.id) as createdAt, name,';
 			   query += '(SELECT contact_user FROM teams tea INNER JOIN companies cp  ON tea.company_id = cp.id WHERE tea.user_id= users.id ) as isContact  FROM companies )';
     		   query += 'c  ) as companies,	 (SELECT array_to_json(array_agg(row_to_json(d)))';
 			   query += 'FROM ( SELECT id, (SELECT ls.created_at FROM listings ls INNER JOIN companies cp ON ls.created_by= cp.id WHERE   ls.created_by= cp.id ) as createdAt, name,';
   			   query += 'description  FROM listings ) 	d  ) as createdListings,';
     		   query += ' (SELECT array_to_json(array_agg(row_to_json(e)))';
 			   query += 'FROM ( SELECT id, (SELECT app.created_at FROM applications app INNER JOIN users u ON app.user_id= u.id WHERE   u.id= users.id) as createdAt, ';
     		   query += ' (SELECT array_to_json(array_agg(row_to_json(z)))';
 			   query += 'FROM ( SELECT l.id, l.name, l.description  FROM listings l  INNER JOIN applications a  ON l.id = a.listing_id WHERE a.user_id = users.id ) 	z  )  as listing,';
   			   query += '(SELECT cover_letter FROM applications appl INNER JOIN users u ON appl.user_id= u.id WHERE   u.id= users.id ) as coverLetter  FROM applications )';
     		   query += 'e  )  as applications     FROM users  WHERE users.id = '+id+' ) t';

    			  // Get a Postgres client from the connection pool
			  var sql =connection.query(query); 
			
    	          // Stream results back one row at a time
    	          sql.on('row', function(row) {
    	             callback(row.row_to_json);
    	          });
			
 	          // After all data is returned, close connection 
 	         sql.on('end', function() {});
		}
	}
}
