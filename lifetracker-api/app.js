"use strict"

/** Express app for Life Tracker */

const express = require("express"); // express object

const app = express() // create an app


// health check
app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })


module.exports = app