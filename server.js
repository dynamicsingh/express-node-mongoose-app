//Get Packages
var express=require('express');
var app=express();
var session=require('express-session');
var apiController= require('./controllers/api_controller');

//For passport middelware
app.use(session({secret: '123456789', resave: false, saveUninitialized: true, cookie: {maxAge:30000}}));
app.use(express.static('public'));

//Rout to Home
app.get('/', function(req, res) {
    //creating form for basic login
    res.send("<form action='/login' method='post'><div><label>Username:</label><input type='text' name='username'/></div><div><label>Password:</label><input type='password' name='password'/></div><div><input type='submit' value='Log In'/></div></form>");
});
apiController(app);

//It will run on localhost:3000/
app.listen(3000);