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
const { doesNotMatch } = require('assert');
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

/***
 * Passport Specific Session Control
 */

passport.use(new LocalStrategy(
    function(username, password, cb) {
       if (!user.auth('username','password')){
           return cb(null, false, {message: 'Incorrect username or password' });
       }
     
       return cb (null, user)
    })
);
    



/***
 * General Settings and Stuff
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

/***
 * Session Control
 */

app.use(express.urlencoded({extended : true}));
app.use(express.json());
//app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'bbb0245414bf2fd014e4c1de30649a20', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());




//routes for static stuff
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/js',express.static(path.join(__dirname, 'public/css')));

/* istanbul ignore next */
if (!module.parent) {
    app.use(logger('dev'));
  }

/***
 * Routes
 */
//app.get('/', site.login);
app.get('/login', site.login);

app.post('/login', passport.authenticate('local',{successRedirect: '/home', failureRedirect: '/s'}));

app.get('/logout', user.logout);



//app.post('/auth', user.login);

/*app.get('/logout', function(request, response){
    request.session.loggedin = true;
    response.redirect(301,'/');
});
*/


app.get('/home', site.index);


app.listen(8000,"0.0.0.0");