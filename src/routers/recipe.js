const express = require('express');
const router = new express.Router();
const Recipe = require('../models/recipe');

router.post('/recipes', async (req, res)=>{
    try{
        let recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).send(recipe);

    } catch(e){
        res.status(400).send(e);
    }
});

router.get('/recipes', async (req,res)=>{
    try{
        const recipes = await Recipe.find({});
        if (!recipes){
            return res.status(404).send();
        }
        
        res.send(recipes);

    }catch(e){
        res.status(500).send(e);
    }
});

router.get('/recipes/:id', async (req,res)=>{
    
    try{
        const _id = req.params.id;
        const recipe = await Recipe.findById(_id)
        if (!recipe){
            return res.status(404).send();
        }

        res.send(recipe);
        
    } catch(e){
        res.status(500).send(e);
    }
});

router.patch('/recipes/:id', async (req, res)=>{
    try{
        const _id = req.params.id;
        const recipe = await Recipe.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        
        if (!recipe){
            return res.status(404).send();
        }
        
        res.send(recipe);
        
    }catch(e){
        res.status(500).send(e);
    }
});

router.delete('/recipes/:id', async (req, res)=>{
    try {
        const _id = req.params.id;
        const recipe = await Recipe.findByIdAndDelete(_id);
        if (!recipe){
            return res.status(404).send();
        }
        res.send(recipe);

    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;