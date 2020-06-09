var mongoose = require('mongoose');
var validator = require('validator');

const recipeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    recipeName: {
        type: String
    },
    recipeImageUrl: {
        type: String
    },
    ingredients: [{
        ingredientName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        amount: { type: Number, default: 0 },
        measurementType: { type: String },
    }],
    directions: [{
        step: { type: String },
        type: { type: String },
        ingrediantsUsed: [{
            ingredientName: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            },
            amount: { type: Number, default: 0 },
            measurementType: { type: String },
        }],
        preperationTime: { type: String }
    }]

}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;