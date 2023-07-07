const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {

    static async fetchUserEmail(userID) {
        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`); 
        }

        const results = await db.query(
            `
            SELECT email FROM users
            WHERE id = $1`, 
            [
                userID
            ]
        ); 

        return results.rows[0];
    }

    static async createExercise(exercise, userID) {
        exercise = exercise.exerciseInfo; 
        console.log("exercise", exercise);
        const requiredFields = ["name", "category", "duration", "intensity"];

        requiredFields.forEach((field) => {
            if (!exercise.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        });

        if (!userID) {
            throw new BadRequestError(`Required field - exerciseID - missing from request body.`)
        }

        const userEmail = await Exercise.fetchUserEmail(userID);

        const results = await db.query(
            `
            INSERT INTO exercise (name, category, duration, intensity, user_id, user_email)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, category, duration, intensity, user_id;
            `,
            [
                exercise.name,
                exercise.category,
                exercise.duration,
                exercise.intensity,
                userID, 
                userEmail.email
            ]
        );

        return results.rows[0];
    }

    static async fetchAllExercisesByUserID(userID) {

        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`); 
        }

        const results = await db.query(
            `
            SELECT * FROM exercise
            WHERE user_id = $1
            `, 
            [userID]
        ); 

        return results.rows;
    }
}

module.exports = Exercise;