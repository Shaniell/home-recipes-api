var mongoose = require('mongoose');
var validator = require('validator');

const Ingredient = {
    ingredientName:{ type: String,
                     required: true,
                     trim: true,
                     lowercase:true },
    amount:{ type: Number, default: 0 },
    measurementType:{ type: String, enum:["cook", "cut", "soak", "bake", "fry", "boil", "peel","sprinkle", "refrigirate", "freeze"] },
};

module.exports = Ingredient;