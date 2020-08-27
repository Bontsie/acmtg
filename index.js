/*** 
 * Module Dependencies
 */
var express = require('express');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var user =  require ('./controllers/user');
var site =  require ('./controllers/site');

module.exports = app;

/*** 
* DB Settings 
*/
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'actmg'
});


/***
 * General Settings and Stuff
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/js',express.static(path.join(__dirname, 'public/css')));

/***
 * Routes
 */
app.get('/', site.index);



//app.post('/auth', user.login);

/*app.get('/logout', function(request, response){
    request.session.loggedin = true;
    response.redirect(301,'/');
});
*/


app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.redirect(301, '/');
    }
    response.end();
});


app.listen(8000,"0.0.0.0");