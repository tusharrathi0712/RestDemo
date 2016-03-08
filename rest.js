var express = require('express');
var route = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'pixtr',
});


route.get('/users', function(req, res) {
	var users = {
		"error" : 1,
		"user" : ""
	};
	connection.query("select * from user1", function(err, rows, fields) {
		if (rows.length !== 0) {
			users.error = 200;
			users.user = rows;
			res.json(users);
		} else {
			users.error = 200;
			users.user = "No data found....";
			res.json(users);
		}
	});
});

route.get('/users/:id', function(req, res) {
	var id=req.params.id;
	var users = {
		"error" : 1,
		"user" : ""
	};

	connection.query("select * from user1 where id=?",[id], function(err, rows, fields) {
		 if (rows.length !== 0) {
			users.error = 200;
			users.user = rows;
			res.json(users);
		 }else { 
			 users.error = 200;
			 users.user = "No user found with requested id....";
			 res.json(users);
		 }	 
	});
	
});

route.put('/users',function(req,res){
    var Firstname = req.body.firstname;
    var Lastname = req.body.lastname;
    var Email = req.body.email;
    var id = req.body.id;
    
    var users = {
        "error":1,
        "user":""
    };
    if(!!Firstname && !!Lastname && !!Email && !!id){
        connection.query("INSERT INTO user1 VALUES(?,?,?,?)",[Firstname,Lastname,Email,id],function(err, rows, fields){
            if(!!err){   
            	users.error = 500;
    			users.user = "Internal Server Problem";
    			
            }else{
            	users.error = 201;
    			users.user = "User inserted into database";
            } 
            res.json(users);
        });
    }else{
    	users.error = 422;
		users.user = "Missing data in Json....";
            res.json(users);
        }

       
});

route.post('/users',function(req,res){
    
    var Firstname = req.body.firstname;
    var Lastname = req.body.lastname;
    var Email = req.body.email;
    var id = req.body.id;
    
    var users = {
        "error":1,
        "user":""
    };
    if(!!Firstname && !!Lastname && !!Email && !!id){
        connection.query("UPDATE user1 SET firstname=?, lastname=?,email=? WHERE id=?",[Firstname,Lastname,Email,id],function(err, rows, fields){
            if(!!err){
            	users.error = 404;
    			users.user = "No data found...";
    			res.json(users);
            }else{
            	users.error = 201;
    			users.user = "User inserted into database";
    			res.json(users);
            }
            
        });
    }else{
    	users.error = 422;
    	users.user = "Please provide all required data (i.e : firstname, lastname, email)";
        res.json(users);
    }
});

route.delete('/users/:id',function(req,res){
    var id = req.params.id;
    var users = {
        "error":1,
        "user":""
    };
    if(!!id){
        connection.query("DELETE FROM user1 WHERE id=?",[id],function(err, rows, fields){
            if(!!err){             
            	users.error = 404;
    			users.user = "No user found...";
    			res.json(users);
            }else{           
            	users.error = 201;
    			users.user = "User deleted successfully";
    			res.json(users);
            }           
        });
    }else{
    	users.error = 400;
    	users.user = "Please provide all required data (i.e : id )";
        res.json(users);
    }
});

module.exports = route;
