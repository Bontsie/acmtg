/*** 
 * Module Dependencies
 */
var express = require('express');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var user =  require ('./controllers/user');
var site =  require ('./controllers/site');
var passport = require ('passport');
var LocalStrategy = require ('passport-local').Strategy;

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

app.set ('connection',connection);

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


/***
 * General Settings and Stuff
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
	secret: 'bbb0245414bf2fd014e4c1de30649a20',
	resave: false,
	saveUninitialized: false
}));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/js',express.static(path.join(__dirname, 'public/css')));
/* istanbul ignore next */
if (!module.parent) {
    app.use(logger('dev'));
  }

/***
 * Routes
 */
app.get('/',passport.authenticate('local',{successRedirect: '/', failureRedirect: '/login'}), site.index);
app.get('/login', site.login);

app.post('/login', passport.authenticate('local',{successRedirect: '/', failureRedirect: '/login'}));

app.get('/logout', user.logout);



//app.post('/auth', user.login);

/*app.get('/logout', function(request, response){
    request.session.loggedin = true;
    response.redirect(301,'/');
});
*/


app.get('/home', function(request, response, next) {
    /*if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.redirect(301, '/');
    }
    response.end();*/
    response.send ('hello');
});


app.listen(8000,"0.0.0.0");