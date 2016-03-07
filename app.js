var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var route = require('./rest');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));

app.use('/', route);
//app.use('/users', route);
//app.use('/users/:id', route);

app.use(function(req, res, next) {
	var err = new Error('Resource Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	
	res.sendStatus(400);
	/*res.sendStatus();
	
	//res.status(err.status || 500);
	
	res.render('error', {
		message : err.message,
		error : err
	});*/
});

module.exports = app;
