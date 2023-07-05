const security = require("../middleware/security");
const Sleep = require("../models/sleep");

const express = require("express");
const router = express.Router();

router.post("/create", security.requireAuthenticatedUser,  (req, res, next) => {
    try {
        const sleepData = req.body;
        const email = req.body.email;
        Sleep.createSleep(sleepData, email);
        return res.status(201).json(req.body);
    } catch (error) {
        next(error);
    }
})

router.get("/:userID", security.requireAuthenticatedUser, async (req, res, next) => {
    try {

        const sleep = await Sleep.fetchAllSleepByEmail(req.params.email);
        return res.status(200).json({ sleep });
    } catch (error) {
        next(error);
    }
})


module.exports = router;