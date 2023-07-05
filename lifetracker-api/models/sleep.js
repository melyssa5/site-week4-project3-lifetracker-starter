const db = require("../db"); 
const { BadRequestError } = require("../utils/errors");

class Sleep {

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

    static async createSleep(sleep, email) {

        const requiredFields = ["start_time", "end_time"];

        requiredFields.forEach((field) => {
            if (!sleep.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        }); 

        if (!email) {
            throw new BadRequestError(`Required field - userID - missing from request body.`)
        }

        const userEmail = await Sleep.fetchUserByEmail(email);

        const results = await db.query(
            `
            INSERT INTO sleep (start_time, end_time, user_email)
            VALUES ($1, $2, $3)
            RETURNING *;
            `, 
            [
                sleep.start_time,
                sleep.end_time,
                userEmail.email
            ]
        ); 

        return results.rows[0];
    }

    static async fetchAllSleepByEmail(email) {

        if (!email) {
            throw new BadRequestError(`Required field - userID - missing from request body.`)
        }

        const results = await db.query(
            `
            SELECT * FROM sleep
            WHERE user_email = $1
            ORDER BY start_time DESC;
            `, 
            [
                email
            ]
        ); 

        return results.rows;
    }

}

module.exports = Sleep;