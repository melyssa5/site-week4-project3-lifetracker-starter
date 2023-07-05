const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {

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



    static async createExercise(exercise, email) {

        const requiredFields = ["name", "category", "duration", "intensity"];

        requiredFields.forEach((field) => {
            if (!exercise.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        });

        if (!email) {
            throw new BadRequestError(`Required field - email - missing from request body.`)
        }

        const userEmail = await Exercise.fetchUserByEmail(email);

        const results = await db.query(
            `
            INSERT INTO exercise (name, category, duration, intensity, user_email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
            [
                exercise.name,
                exercise.category,
                exercise.duration,
                exercise.intensity,
                userEmail.email
            ]
        );

        return results.rows[0];
    }


    static async fetchAllExercisesByEmail(email) {
        if (!email) {
            throw new BadRequestError(`Required field - email - missing from request body.`); 
        }

        const results = await db.query(
            `
            SELECT * FROM exercise
            WHERE user_email = $1
            `, 
            [email]
        ); 

        return results.rows;
    }
}

module.exports = Exercise;