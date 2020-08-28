const user = require("./user");
const session = require("express-session");
const connection = require("./db");
exports.index = function(req, res){
    
   
   connection.query ("SELECT id, name FROM accounts", function(error, results, fields){
        res.render("index", { data: JSON.stringify(results), title: 'Users', err_msg: null, currUser: session.user});
    });
    
   
};


exports.login = function(request, response){
    //response.send ("hello world");
    
    
    response.render('login', { title: 'Please Login', message: request.message, currUser:''  });
    
};

exports.login_err = function(request, response){
    response.render('login', { title: 'Logged Out', err_msg: 'err', currUser:''  });
};
