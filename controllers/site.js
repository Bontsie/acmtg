exports.index = function(request, response){
    if (request.session.loggedin) {
        //response.send('Welcome back, ' + request.session.username + '!');
        response.render('login', { title: 'Logged In' });

    } else {
        response.render('login', { title: 'Logged Out' });
    }
    
  };

