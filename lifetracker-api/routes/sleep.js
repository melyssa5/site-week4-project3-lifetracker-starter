const security = require("../middleware/security");
const SleepModel = require("../models/sleep");
const express = require("express");
const router = express.Router();

router.post("/create", (req, res, next) => {
    try {
        const sleepData = req.body;
        const userID = req.body.userID;
        console.log("userID", userID)
        SleepModel.createSleep(sleepData, userID);
        return res.status(201).json(req.body);
    } catch (error) {
        next(error);
    }
})

router.get("/:userID", async (req, res, next) => {
    try {

        const sleep = await SleepModel.fetchAllSleepByUserID(req.params.userID);
        return res.status(200).json({ sleep });
    } catch (error) {
        next(error);
    }
})


module.exports = router;