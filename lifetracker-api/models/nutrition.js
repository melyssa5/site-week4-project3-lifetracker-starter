const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Nutrition {
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError(
        "Required field -- user email -- is missing from the request body"
      );
    }
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email.toLowerCase(),
    ]);
    const user = result.rows[0];
    return user;
  }

  static async createNutrition(nutritionData, email) {
    const requiredFields = ["name", "category", "quantity", "calories"];

    requiredFields.forEach((field) => {
      if (!nutritionData.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} - missing from request body.`
        );
      }
    });

    if (!userID) {
      throw new BadRequestError(
        `Required field - userID - missing from request body.`
      );
    }

    const userEmail = await Nutrition.fetchUserByEmail(email);

    const results = await db.query(
      `
            INSERT INTO nutrition (name, category, calories, email)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
      [
        nutritionData.name,
        nutritionData.category,
        nutritionData.calories,
        userEmail.email,
      ]
    );
    return results.rows[0];
  }


  static async fetchAllNutritionEntriesByEmail(email) {
            
    if (!email) {
        throw new BadRequestError(`Required field - email - missing from request body.`); 
    }

    const results = await db.query(
        `
        SELECT * FROM nutrition
        WHERE email = $1;
        `,
        [email]
    );

    return results.rows;
}


}

module.exports = Nutrition;
