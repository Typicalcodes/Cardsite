const express = require("express");
const router = express.Router();
const team = require("../Models/Team/Teamsdata");
const user = require("../Models/User/CreateUser");
router.post("/createteam", async (req,res)=>{
    const {name,members} = req.body;
    try {
        const tdata = new team({name,members});
        const fa = await tdata.save();
        res.json(fa)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

router.get("/team", async (req,res)=>{
    try {
        const fa = await team.find({});
        res.json(fa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/team/id/:id", async (req,res)=>{
    const { id } = req.params;
    try {
        const data = await user.find({id});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})
module.exports = router;