"use strict";

const db = require("../db"); // import the database
const bcrypt = require("bycrpt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {


  /**
   * Register user in database
   *
   * Throws BadRequestError on duplicates
   *
   * @returns user
   */

  static async register(creds){
    // destructure input info
    const {email, firstname, lastname, password} = creds

    const existingUserWithEmail = await User.fetchUserByEmail(email)

    if (existingUserWithEmail){
        throw new BadRequestError(`Duplicate email: ${email}`)
    }

    const salt = await bcrypt.genSalt(13)
    const hashedPassword = await bcrypt.hash(password, salt)
    const normalizedEmail = email.toLowerCase()

    const result = await db.query(
        `INSERT INTO users (
            password,
            first_name,
            last_name,
            email,
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id,
                    email,            
                    first_name AS "firstName", 
                    last_name AS "lastName",
                    location,
                    date
                    `,
        [hashedPassword, firstname, lastName, normalizedEmail, location, date]
      )
    


  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email.toLowerCase(),
    ]);
    const user = result.rows[0];
    return user;
  }
}
