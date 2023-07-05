const Nutrition = require('../models/nutrition');
const security = require('../middleware/security');

const express = require('express');
const router = express.Router();


// endpoint to create a new nutrition card entry
router.post("/create", security.requireAuthenticatedUser, (req, res, next) => {
    try {
        const nutritionData = req.body;
        const userEmail = req.body.email;
        Nutrition.createNutrition(nutritionData, userEmail);
        return res.status(201).json(req.body);
    } catch (error) {
        next(error);
    }
})

router.get("/:userEmail", security.requireAuthenticatedUser,  async (req, res, next) => {
    try {
        console.log("params", req.params); 
        const nutrition = await Nutrition.fetchAllNutritionEntriesByEmail(req.params.userEmail);
        return res.status(200).json({ nutrition });
    } catch (error) {
        next(error);
    }
})


module.exports = router;