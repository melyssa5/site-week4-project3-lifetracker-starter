// This file contains the model for the user resource
const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, BCRYPT_SALT_ROUNDS } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

// This is a class that will represent a user
class User {

    // Static method to make a user object
    static createPublicUser(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username, 
        }
    }

static async fetchUserByEmail(email) {
  if (!email) {
    throw new BadRequestError("Email is required");
  }

  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await db.query(query, [email]);

  if (result.rows.length === 0) {
    return null; // Return null when no user is found
  }

  const user = result.rows[0];
  return user;
}

    static async login(credentials) {
        // user should submit their email and password
        // if any of these fields are missing, throw a 400 error
        const requiredFields = ["email", "password"];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        // lookup the user in the db by email
        const user = await User.fetchUserByEmail(credentials.email);

        // if a user is found, compare the submitted password
        // with the password in the db
        // if there is a match, return the user
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
                return User.createPublicUser(user);
            }
        }

        // if anything goes wrong, throw an error
        throw new UnauthorizedError("Invalid email/password combo");

    }

    static async register(credentials) {

        const requiredFields = ["email", "password", "firstName", "lastName", "username"];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        })

        const doesUserAlreadyExist = await User.fetchUserByEmail(credentials.email);
        
        if (doesUserAlreadyExist) {
            throw new BadRequestError(`User already exists with email: ${credentials.email}`);
        }

        const saltedPassword = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

        const hashedPassword = await bcrypt.hash(credentials.password, saltedPassword);
        console.log("hashedPassword", hashedPassword);

        const result = await db.query(
            `INSERT INTO users (
                email, 
                username,
                first_name, 
                last_name, 
                password

            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, username, first_name, last_name, password;`,
            [
                credentials.email,
                credentials.username,
                credentials.firstName,
                credentials.lastName,
                hashedPassword,
            ]
        ); 

        const user = result.rows[0];
        return user;

    }

}

module.exports = User;