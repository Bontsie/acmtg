exports.login = function (request, response){
    var username = request.body.username;
    var password = request.body.password;
    var connection = request.app.get('connection');
    
        if (username && password) {
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/');
                } else {
                    response.render('login', { title: 'Login Error', err_msg: 'err'  });
                }			
                response.end();
            });
        } else {
            response.send('Wait ' + username + " " +password) ;
            response.end();
        }
  
};

exports.logout = function (request, response){
    if (request.session.loggedin){
        request.session.loggedin = false;
        request.session.username = "";
    }
    response.redirect ('/login');

};
