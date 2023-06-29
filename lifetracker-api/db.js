"use strict"

/** Database setup for lifetracker */

const { getDatabaseUri } = require("./config")
const { Client } = require("pg")


require("colors")

const db = new Client({ connectionString: getDatabaseUri() })

db.connect((err) => {
  if (err) {
    console.error("connection error", err.stack)
  } else {
    console.log("Successfully connected to postgres database!".blue)
  }
})

module.exports = db