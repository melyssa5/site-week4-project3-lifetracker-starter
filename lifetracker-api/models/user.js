"use strict";

const db = require("../db"); // import the database
const bcrypt = require('bcrypt')
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
    const {email, firstName, lastName, password} = creds

    const existingUserWithEmail = await User.fetchUserByEmail(email)

    if (existingUserWithEmail){
        throw new BadRequestError(`Duplicate email: ${email}`)
    }

    const salt = await bcrypt.genSalt(13)
    const hashedPassword = await bcrypt.hash(password, salt)
    const normalizedEmail = email.toLowerCase()

    const query = 'INSERT INTO users (firstname, lastname, emailaddress, password) VALUES ($1, $2, $3, $4) RETURNING *;'
    const { rows } = await pool.query(query, [firstName, lastName, email, hashedPassword])
    return rows[0] // returns info about the user
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


module.exports = User
