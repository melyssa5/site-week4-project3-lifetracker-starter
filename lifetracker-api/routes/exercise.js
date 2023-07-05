const security = require("../middleware/security");
const Exercise = require("../models/exercise"); 
const User = require("../models/user"); 

const express = require("express");
const router = express.Router();

router.post("/create", security.requireAuthenticatedUser,  (req, res, next) => {

    try {
    const exerciseData = req.body;  
    const email = req.body.email;
    Exercise.createExercise(exerciseData, email);
    return res.status(201).json(req.body);
    } catch (error) {
        next(error); 
    }
})

router.get("/:userID", security.requireAuthenticatedUser,  async (req, res, next) => {
    try {
        const allExercises = await Exercise.fetchAllExercisesByEmail(req.params.email);
        return res.status(200).json({ allExercises });
    } catch (error) {
        next(error);
    }
})


module.exports = router;