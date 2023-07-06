"use strict";

const db = require("../db"); // import the database
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {

  // Static method to make a user object
  static createPublicUser(user) {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username, 
    }
}

  /**
   * Authenticate user with email and password
   *
   * Throws UnauthorizedError if the user is not found or the user info is wrong.
   *
   * @returns user
   */

  static async authenticate(creds) {
    // destructure input info
    const { email, password } = creds;
    console.log(email);
    const user = await User.fetchUserByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid == true) {
        return user;
      }
    }
    throw new UnauthorizedError("Invalid email or password");
  }

  /**
   * Register user in database
   *
   * Throws BadRequestError on duplicates
   *
   * @returns user
   */

  static async register(creds) {
    // destructure input info
    const { email, firstName, lastName, password, username } = creds;

    const existingUserWithEmail = await User.fetchUserByEmail(email);

    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);
    const normalizedEmail = email.toLowerCase();

    const query =
      "INSERT INTO users (first_name, last_name, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    const { rows } = await db.query(query, [
      firstName,
      lastName,
      normalizedEmail,
      hashedPassword,
      username,
    ]);
    return rows[0]; // returns info about the user
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

  /**
   * Generate a JWT
   */

  static generateAuthToken(user) {
    const payload = {
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
      emailaddress: user.email,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    return token;
  }

  static verifyAuthToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}

module.exports = User;
