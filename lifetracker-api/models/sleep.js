const db = require("../db"); 
const { BadRequestError } = require("../utils/errors");

class Sleep {

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

    static async createSleep(sleep, userID) {

        sleep = sleep.sleepInfo;
        const requiredFields = ["start_time", "end_time"];

        requiredFields.forEach((field) => {
            if (!sleep.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        }); 

        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`)
        }

        const userEmail = await Sleep.fetchUserEmail(userID);

        const results = await db.query(
            `
            INSERT INTO sleep (start_time, end_time, user_id, user_email)
            VALUES ($1, $2, $3, $4)
            RETURNING id, start_time, end_time, user_id;
            `, 
            [
                sleep.start_time,
                sleep.end_time,
                userID,
                userEmail.email
            ]
        ); 

        return results.rows[0];
    }

    static async fetchAllSleepByUserID(userID) {

        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`)
        }

        const results = await db.query(
            `
            SELECT * FROM sleep
            WHERE user_id = $1
            ORDER BY start_time DESC;
            `, 
            [
                userID
            ]
        ); 

        return results.rows;
    }

}

module.exports = Sleep;