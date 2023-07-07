const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Nutrition {

    static async fetchUserEmail(userID) {
        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`); 
        }

        const results = await db.query(
            `
            SELECT email FROM users
            WHERE id = $1
            `, 
            [
                userID
            ]
        );

        return results.rows[0];
    }

    static async createNutrition(nutritionData, userID) {

        const requiredFields = [
            "calories",
            "quantity", 
            "imageUrl", 
            "nutritionCategory", 
            "nutritionName"
        ];

        const actualFields = nutritionData.nutritionInfo
        console.log("nutritionData", nutritionData.nutritionInfo)

        requiredFields.forEach((field) => {
            if (!actualFields.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            };
        });

        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`); 
        }

        const userEmail = await Nutrition.fetchUserEmail(userID);

        const results = await db.query(
            `
            INSERT INTO nutrition (calories, quantity, image, category, name, user_id, user_email)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, calories, quantity, image, category, name, user_id;
            `, 
            [
                actualFields.calories,
                actualFields.quantity,
                actualFields.imageUrl,
                actualFields.nutritionCategory,
                actualFields.nutritionName,
                userID,
                userEmail.email
            ]
            );
        
        console.log("results", results.rows[0]); 
        return results.rows[0];
    }

    static async fetchAllNutritionEntriesByUserID(userID) {
            console.log("userID", userID);
            if (!userID) {
                throw new BadRequestError(`Required field - userID - missing from request body.`); 
            }
    
            const results = await db.query(
                `
                SELECT * FROM nutrition
                WHERE user_id = $1;
                `,
                [userID]
            );
    
            return results.rows;
    }

}

module.exports = Nutrition;