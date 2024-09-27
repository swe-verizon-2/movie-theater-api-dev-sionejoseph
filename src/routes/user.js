const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Show = require('../../models/Show');

router.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        res.json(allUsers)
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
       const user = await User.findByPk(req.params.id);
       res.json(user);
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.get("/:id/shows", async (req, res, next) => {
    try {
       const user = await User.findByPk(req.params.id, {include: Show});
       res.json(user.Shows);
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.put("/:id/shows", async (req, res, next) => {
    try {
       let user = await User.findByPk(req.params.id);
       const shows = Show.findAll();
       await user.addShows(shows[0]);
       user = await User.findByPk(req.params.id, {include: Show});
       res.json(user.shows);
    } catch (e) {
        console.error(e);
        next(e);
    }
})