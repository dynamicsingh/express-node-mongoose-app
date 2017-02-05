var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/mydb'); //connecting to MongoDB

//Making Schema
var schema=mongoose.Schema;
var userSchema= new schema({
    fullName: String,
    dob: String,
    country: String,
    contact: [{
        phone: String,
        home: String
    }],
    address: [{
        permanent: String,
        current: String
    }],
    uname: String,
    password: String,
    roll: String,
    status: Boolean
});

//Giving model
var user_Model= mongoose.model('apiUser', userSchema);
module.exports=user_Model;