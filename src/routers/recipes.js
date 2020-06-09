const express = require('express');
const router = new express.Router();
const Recipe = require('../models/recipe');
const auth = require('../middleware/auth');

router.post('/recipes',auth, async (req, res)=>{
    try{

        if (req.body.owner){
            delete req.body.owner;
        }

        const recipe = new Recipe({
            ...req.body,
            owner: req.user._id
        });

        await recipe.save();
        res.status(201).send(recipe);

    } catch(e){
        res.status(400).send(e);
    }
});

// GET /recipes?isPrivate=true
// GET /recipes?limit=10&skip=0
// GET /recipes?sort=createdAt:desc
router.get('/recipes',auth, async (req,res)=>{
    try{

        const match = {}
        const sort = {}

        if (req.query.isPrivate){
            match.isPrivate = req.query.isPrivate === 'true'
        }

        if (req.query.sort){
            const sortParam = req.query.sort.split(':');

            sort[sortParam[0]] = sortParam[1] === 'desc'? -1 : 1;
        }

        //const recipes = await Recipe.find({owner: req.user._id});
        //const recipes = await req.user.populate('recipes').execPopulate();
        const recipes = await req.user.populate({
            path: 'recipes',
            match: match,
            options:{
                options:{
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort:sort
                }
            }
        }).execPopulate();



        if (!recipes){
            return res.status(404).send();
        }
        
        res.send(recipes);

    }catch(e){
        res.status(500).send(e);
    }
});

// GET /recipes?limit=10&skip=0
// GET /recipes?sort=createdAt:desc
router.get('/recipes/public',auth, async (req,res)=>{
    try{

        const sort = {}

        if (req.query.sort){
            const sortParam = req.query.sort.split(':');

            sort[sortParam[0]] = sortParam[1] === 'desc'? -1 : 1;
        }

        const recipes = await Recipe.find({
                                            isPrivate: false
                                          }, 
                                          null, 
                                          {
                                              limit: parseInt(req.query.limit),  
                                              skip: parseInt(req.query.skip), 
                                              sort:sort
                                          });

        if (!recipes){
            return res.status(404).send();
        }
        
        res.send(recipes);

    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
});


router.get('/recipes/:id',auth, async (req,res)=>{
    
    try{
        const _id = req.params.id;
        const recipe = await Recipe.findOne({ _id, owner: req.user._id });

        if (!recipe){
            recipe = await Recipe.findOne({ _id, isPrivate: false });
        }

        if (!recipe){
            return res.status(404).send();
        }

        res.send(recipe);
        
    } catch(e){
        res.status(500).send(e);
    }
});

router.patch('/recipes/:id',auth, async (req, res)=>{
    try{
        const _id = req.params.id;

        //const recipe = await Recipe.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        const recipe = await Recipe.findOneAndUpdate({ _id: _id, owner: req.user._id}, req.body, { new: true, runValidators: true });
        //const recipe = await Recipe.findOne({ _id: _id, owner: req.user._id});

        
        if (!recipe){
            return res.status(404).send();
        }
        
        //recipe.updateOne(req.body, { new: true, runValidators: true });
        res.send(recipe);
        
    }catch(e){
        res.status(500).send(e);
    }
});

router.delete('/recipes/:id',auth, async (req, res)=>{
    try {
        const _id = req.params.id;
        const recipe = await Recipe.findOneAndDelete({_id: _id, owner: req.user._id});
        if (!recipe){
            return res.status(404).send();
        }
        res.send(recipe);

    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;