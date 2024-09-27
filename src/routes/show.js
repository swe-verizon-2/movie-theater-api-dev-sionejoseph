const express = require('express');
const router = express.Router();
const { User, Show } = require('../../models');

router.get("/", async (req, res, next) => {
    try {
        if (req.query.genre) {
            const genreShows = await Show.findAll({where: {genre: req.query.genre}});
            res.json(genreShows);
        } else {
            const allShows = await Show.findAll();
            res.json(allShows);
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
       const show = await Show.findByPk(req.params.id);
       res.json(show);
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.get("/:id/users", async (req, res, next) => {
    try {
       const show = await Show.findByPk(req.params.id, {include: User});
       if (!(show.users.length > 0)){
        res.json({message: "no users have watched this show"})
       } else {
        res.json(show.users);
       }
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.put("/:id/available", async (req, res, next) => {
    try {
       const show = await Show.findByPk(req.params.id);
       switch(show.available){
        case false:
            await show.update({available: true}) 
            res.send("this show is now available. Happy streaming!")
        case true:
            await show.update({available: false}) 
            res.send("this show is no longer available. Try one of other shows")
       } 
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
       let show = await Show.findByPk(req.params.id);
       show = await show.destroy();
       res.json(show);
    } catch (e) {
        console.error(e);
        next(e);
    }
})


module.exports = router;
