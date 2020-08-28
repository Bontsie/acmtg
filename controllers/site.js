const user = require("./user");
const session = require("express-session");
const connection = require("./db");
const { response } = require("..");
exports.index = function(req, res){
    
   
   connection.query ("SELECT id, username, name FROM accounts", function(error, results, fields){
        res.render("index", { data: results, title: 'Users', err_msg: null, currUser: session.user});
    });
    
   
};


exports.login = function(request, response){
    //response.send ("hello world");
    
    
    response.render('login', { title: 'Please Login', message: request.message, currUser:''  });
    
};

exports.login_err = function(request, response){
    response.render('login', { title: 'Logged Out', err_msg: 'err', currUser:''  });
};


exports.user = function (req, res){
    var qData;
    connection.query ("SELECT * from accounts  WHERE id = ? ", req.params.id ,function (err, resp, fields){
   
        console.log(">"+JSON.stringify(resp));

        res.render('editUser.ejs',{title: 'User Management', err_msg: null, currUser: session.user, data: resp });
    });
    
    
}