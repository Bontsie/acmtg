const session = require("express-session");
const connection = require("./db");
const { request } = require("express");
exports.login = function (request, response, next){
    var username = request.body.username;
    var password = request.body.password;
    var connection = request.app.get('connection');
    
        if (username && password) {
            connection.query('SELECT * FROM tblusers WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    //this.list;
                    request.post ()
                    response.redirect('/');
                } else {
                    response.render('login', { title: 'Login Error', err_msg: 'err'  }, user.list);
                }			
                response.end();
            });
        } else {
            response.send('Wait ' + username + " " +password) ;
            response.end();
        }
  
};



exports.auth = function (username, password, req){
    
    if (username && password) {
        connection.query('SELECT * FROM tblusers WHERE username = ? AND password = ?', [username, password], function(error, results, fields){ 
            session.user = username;
            if (results.length > 0) {
                //console.log(">true");
                req (null, username);
                //return (username);
            }
            else{
                //req (null,{message: 'err'});
                
                req (new Error ('error message'));
                //return null;
            }			
        });
    }
    
}

exports.logout = function (request, response){
    if (request.session.loggedin){
        request.session.loggedin = false;
        request.session.username = "";
    }
    response.redirect ('/login');

};


exports.list = function (){
    
    connection.query ("SELECT id, name FROM tblusers", function(error, results, fields){
       session.queryResults = results;
    });
    
}   

exports.isAuth = function (req, res, next){
    if(req.session.loggedin){
        var err = new Error ("not logged in");
        err.status = 400;
        return (next(err))
    }
    else{

        return next();
    }
}

exports.save = function (req, res){
    connection.query ("UPDATE tblusers SET name = ?, password = ?, dob = ?, gender = ?  WHERE id = "+ req.body.id , [req.body.name, req.body.password, req.body.dob, req.body.gender] ,function(error, results, fields){
        res.redirect ("/home");
        console.log(error);
        console.log(results);
    });
}


exports.new = function (req, res){
    connection.query ("INSERT INTO tblusers (name, username, password, dob, gender) VALUES (?, ?, ?, ?, ?)" , [req.body.name,req.body.username, req.body.password, req.body.dob, req.body.gender] ,function(error, results, fields){
        res.redirect ("/home");
        console.log(error);
        console.log(results);
    });
}

exports.delete = function (req, res){
    connection.query ("DELETE FROM tblusers WHERE id = "+ req.body.id ,function(error, results, fields){
        res.redirect ("/home");
        console.log(error);
        console.log(results);
    });
}

