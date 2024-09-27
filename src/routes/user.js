const express = require('express');
const router = express.Router();
const { User, Show } = require('../../models');

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
       if (!(user.shows.length > 0)){
        res.json({message: "you have not watched any shows"})
       } else {
        res.json(user.shows);
       }
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.put("/:userId/shows/:showId", async (req, res, next) => {
    try {
       const user = await User.findByPk(req.params.userId);
       const show = await Show.findByPk(req.params.showId);
       await user.addShow(show);

       const updatedUser = await User.findByPk(req.params.userId, {include: Show});
       res.json(updatedUser.shows);

    } catch (e) {
        console.error(e);
        next(e);
    }
})

module.exports = router;