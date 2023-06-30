"use strict"

/** Express app for Life Tracker */

const express = require("express"); // express object
const cors = require("cors")
const morgan = require("morgan")
const router = require("./routes/routes")

const app = express() // create an app

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

app.use("/auth", router)


// health check
app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })


module.exports = app