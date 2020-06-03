var mongoose = require('mongoose');
var validator = require('validator');


const Direction = {
    step:{ type: String },
    type:{ type: String },
    ingrediantsUsed:[ingredient],
    preperationTime: {type: String}
};

module.exports = Direction;