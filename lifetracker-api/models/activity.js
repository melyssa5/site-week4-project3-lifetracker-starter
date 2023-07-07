const db = require("../db"); 

class Activity {
    
    // fetchUserID is going to get the id of the email from the users tables based on the passed in userEmail
    static async fetchUserID(userEmail) {
        
        const results = await db.query(
            `
            SELECT id FROM users
            WHERE email = $1`, 
            [
                userEmail
            ]
        ); 

        console.log("RESULTS", results.rows[0].id)
        return results.rows[0];
    }


    static async fetchUserSummaryStats(userID) {

        console.log("IM HERE"); 
        console.log("USER ID IN ACTIVITY", userID)
        const sqlQuery = 
        `SELECT AVG(calories) AS calories, category FROM nutrition WHERE user_id=$1 GROUP BY category LIMIT 6;`;

        const results = await db.query(sqlQuery, [userID]);

        const sqlQuery2 =  `
        SELECT SUM(calories)
               AS calories,
               TO_CHAR(created_at :: DATE, 'dd/mm/yyyy') AS "createdAt"
               FROM nutrition
               WHERE user_email=$1
               GROUP BY "createdAt"
               LIMIT 6;`;
        const sqlQuery2Results = await db.query(sqlQuery2, [userID]);

        return {
            avgCaloriesPerCategory: results.rows[0] || 0,
            totalCaloriesPerDay: sqlQuery2Results.rows || 0
        }

    }

}

module.exports = Activity;