const session = require("express-session");

exports.login = function (request, response, next){
    var username = request.body.username;
    var password = request.body.password;
    var connection = request.app.get('connection');
    
        if (username && password) {
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
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



exports.auth = function (username, password){
    return "Username";
    

}

exports.logout = function (request, response){
    if (request.session.loggedin){
        request.session.loggedin = false;
        request.session.username = "";
    }
    response.redirect ('/login');

};


exports.list = function (request, response){
    //var connection = request.app.get('connection');
    /*connection.query ("SELECT id, name FROM accounts", function(error, results, fields){
        response.render ('index', { title: 'Login Error', err_msg: 'err', currUser: request.session.username, data: results   })

    });*/
     request.session.data =({'id': 1, 'name': 'Bonta'});
    response.json({'id': 1, 'name': 'Bonta'});
     next ();
//    response.render ('index', { title: 'Login Error', err_msg: 'err', currUser: request.session.username, data: {'id': 1, 'name': 'Bonta'}   })
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