//Having model to make the query
var apiModel=require('../models/api_model');

var bodyParser=require('body-parser'); // Parsing JSON data from HTTP request

//Exporting the api whoever requests(In our case server.js)
module.exports=function(app) {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//API to update/ create a new user profile
app.post('/profile', function(req, res) {
    if(req.body.id) {
        //calling mongoose function to find data by ID and update it
        apiModel.findByIdAndUpdate(req.body.id, {
            fullName: req.body.name,
            dob: req.body.dob,
            country: req.body.country,
            contact: [{
            phone: req.body.phone,
            home: req.body.home
            }],
            address: [{
            permanent: req.body.permanent,
            current: req.body.current
            }],
            status: req.body.status
        }, function(err, todo) {
                if(err) throw err;
                res.send('UPDATED DATA: '+todo);
        });
    }
    else {
        // Creating new user by mongoose model and saving by save function
        var user=apiModel({
            fullName: req.body.name,
            dob: req.body.dob,
            country: req.body.country,
            contact: [{
            phone: req.body.phone,
            home: req.body.home
        }],
        address: [{
            permanent: req.body.permanent,
            current: req.body.current
        }],
        uname: req.body.uname,
        password: req.body.password,
        status: req.body.status
        });
        user.save(function(err, data) {
            if(err) throw err;
            res.send("DATA IS SAVED: "+ data);
        });
    }
});


//API to check if the user is have a correct username and password
app.post('/login', function(req, res) {
    apiModel.find({uname: req.body.uname, password: req.body.password}, function(err, data) {
        res.send(data);
        if(err) {
            res.send(err);
        }
        else {
            res.send("LOGIN SUCCESSFULL");
        }
    });
});

//API to giving user a facility to create new password option by his username, although it is not ready to face real world
app.post('/forgot', function(req, res) {
    if(req.body.uname) {
        res.send("<html><body><form action='' method='POST'><input type='password' name='password' /><input type='password' name='cpassword' /><input type='submit' value='SUBMIT' /></form></body></html>");
    }
    else {
        res.send("<html><body><form action='' method='POST'><input type='text' name='uname' /><input type='submit' value='SUBMIT' /></form></body></html>");
    }
});
};