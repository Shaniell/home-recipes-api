var mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); 
const Recipes = require('./recipe');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase:true
    },
    email: {
        type: String,
        unique:true,
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
        type: String,
        required: true
    },
    tokens: [{
        token: { 
            type: String, 
            required:true 
        }
    }]
});

// Hash password
userSchema.pre('save', async function(next){
    const user = this;

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.pre('remove', async function(next){
    const user = this;
    
    await Recipes.deleteMany({ owner: user._id});

    next();
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;

    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
}

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.statics.findByCredentials= async function(username, password){
    const user = await User.findOne({username: username});

    if (!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'owner'
});

const User = mongoose.model('User', userSchema);

module.exports = User;