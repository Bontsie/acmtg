exports.index = function(request, response){
    if (request.session.loggedin) {
        //response.send('Welcome back, ' + request.session.username + '!');
        response.render('index', { title: 'Logged In', err_msg: '', currUser: request.session.username });

    } else {
        //response.render('login', { title: 'Logged Out', err_msg: ''  });
        response.redirect(301, '/login');
    }
    
  };


exports.login = function(request, response){
    response.render('login', { title: 'Logged Out', err_msg: '', currUser:''  });
};

exports.login_err = function(request, response){
    response.render('login', { title: 'Logged Out', err_msg: 'err', currUser:''  });
};
