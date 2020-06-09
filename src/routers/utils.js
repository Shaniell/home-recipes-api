const express = require('express');
const router = new express.Router();
const Recipe = require('../models/recipe');
const auth = require('../middleware/auth');

router.get('/utils/directionTypes',auth,(req,res)=>{
    res.send(["cook", "cut", "soak", "bake", "fry", "boil", "peel", "sprinkle", "refrigirate", "freeze"]);
});

router.get('/utils/measurementTypes',auth,(req,res)=>{
    res.send(["Kg", "Mg", "Liter", "Mililiter"]);
});


module.exports = router;