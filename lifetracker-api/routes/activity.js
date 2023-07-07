const ActivityModel = require("../models/activity"); 
const express = require("express"); 
const router = express.Router(); 

router.get("/:userID", async (req, res, next) => {


    try {
        const result = await ActivityModel.fetchUserSummaryStats(req.params.userID);

        return res.status(200).json({ activities: result });
    } catch (error) {
        next(error)
    }

})

module.exports = router;