var mongoose = require('mongoose');
var validator = require('validator');

var direction = {
    step:{ type: String },
    type:{ type: String },
    ingrediantsUsed:[ingredient],
    preperationTime: {type: String}
};

var ingredient = {
    ingredientName:{ type: String,
                     required: true,
                     trim: true,
                     lowercase:true },
    amount:{ type: Number, default: 0 },
    measurementType:{ type: String, enum:["cook", "cut", "soak", "bake", "fry", "boil", "peel","sprinkle", "refrigirate", "freeze"] },
};


const Recipe = mongoose.model('Recipe', {
    userId:{
        type:String
    },
    recipeName: {
        type: String
    },
    recipeImageUrl: {
        type: String
    },
    ingredients:[{
        ingredientName:{ type: String,
                         required: true,
                         trim: true,
                         lowercase:true },
        amount:{ type: Number, default: 0 },
        measurementType:{ type: String, enum:["cook", "cut", "soak", "bake", "fry", "boil", "peel","sprinkle", "refrigirate", "freeze"] },
    }],
    directions:[{
        step:{ type: String },
        type:{ type: String },
        ingrediantsUsed:[{
            ingredientName:{ type: String,
                             required: true,
                             trim: true,
                             lowercase:true },
            amount:{ type: Number, default: 0 },
            measurementType:{ type: String, enum:["cook", "cut", "soak", "bake", "fry", "boil", "peel","sprinkle", "refrigirate", "freeze"] },
        }],
        preperationTime: {type: String}
    }]

});

module.exports = Recipe;