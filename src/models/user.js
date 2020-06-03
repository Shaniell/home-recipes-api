var mongoose = require('mongoose');
var validator = require('validator');

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                new Error("Email is invalid");
            }
        }
    },
    password:{
        type: String
    }
});

module.exports = User;