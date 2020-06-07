const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');


router.post('/users', async (req, res) => {

    let user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout',auth, async(req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token !== req.user.token;
        })

        await req.user.save();

        res.send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/users/logoutAll',auth, async(req, res)=>{
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/users/login', async(req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send();
    }
});

router.get('/users',auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/me',auth, async (req, res) => {
    try {
        res.send(req.user);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/:id',auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);

    } catch (e) {
        res.status(500).send(e);
    }
});


router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        

        // if (!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();

        res.send(req.user);

    } catch (e) {
        res.status(500).send(e);
    }
});


router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' });
    }

    try {
        // const _id = req.params.id;
        // const user = await User.findById(_id);

        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        });

        // for middleware
        await req.user.save();

        //const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        // if (!req.user) {
        //     return res.status(404).send();
        // }

        res.send(req.user);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;