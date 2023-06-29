"use strict"

const db = require("../db") // import the database
const bcrypt = require("bycrpt")
const { BadRequestError, UnauthorizedError} = require("../utils/errors")

const { BCRYPT_WORK_FACTOR } = require("../config")


class User {
    
}