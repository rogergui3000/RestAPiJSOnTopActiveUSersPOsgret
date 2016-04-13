var express = require('express'),
	http = require('http'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use('/', express.static(__dirname + '/public'));

app.all('/*', function (req, res, next) {
	// CORS headers
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

// route
app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use( function (req, res, next) {
	var err = new Error ('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Start the server
http.createServer(app).listen(app.get('port'), function() {
	
	console.log('Express server listening on port ' + app.get('port'));
});
