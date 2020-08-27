var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'actmg'
});

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.locals.currUser = req.session.username;
    next();
  });

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static ('static'));
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }			
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/logout', function(request, response){
    request.session.loggedin = true;
    response.redirect(301,'/');
});

app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.redirect(301, '/');
    }
    response.end();
});


app.listen(8000,"0.0.0.0");