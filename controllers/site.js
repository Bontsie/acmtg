exports.index = function(request, response){
    /*
    if (request.session.loggedin) {
        //response.send('Welcome back, ' + request.session.username + '!');\
        request.session.data="eh";
        //user.list;
        response.render('index', { title: 'Logged In', err_msg: '', currUser: request.session.username, data: request.session.data });

    } else {
        //response.render('login', { title: 'Logged Out', err_msg: ''  });
        response.redirect(301, '/login');
    }
    */
   response.send ("hello world");
  };


exports.login = function(request, response){
    //response.send ("hello world");
    
    response.render('login', { title: 'Please Login', err_msg: '', currUser:''  });
};

exports.login_err = function(request, response){
    response.render('login', { title: 'Logged Out', err_msg: 'err', currUser:''  });
};
