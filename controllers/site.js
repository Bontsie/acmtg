exports.index = function(req, res){
   res.send('Welcome back, ' + JSON.stringify (req.user) + '!');
};


exports.login = function(request, response){
    //response.send ("hello world");
    
    
    response.render('login', { title: 'Please Login', message: request.message, currUser:''  });
};

exports.login_err = function(request, response){
    response.render('login', { title: 'Logged Out', err_msg: 'err', currUser:''  });
};
