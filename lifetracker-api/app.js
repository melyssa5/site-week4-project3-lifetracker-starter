/** Express app for Life Tracker */

const express = require("express"); // importing express object
const cors = require("cors") // import cors
const morgan = require("morgan") // import the Morgan middleware for logging
const router = require("./routes/auth") // import the routes
const nutritionRouter = require("./routes/nutrition")
const security = require("./middleware/security")

const app = express() //calling using express in the app as a function

// --- Setting up Middleware ---
//app use is the middleware - like front doors
// enable cross-origin resource sharing for all origins for all requests
app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("dev"))

// for every request, check if a token exists in the 
// authorization header. if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt)
app.use("/auth", router)
app.use("/nutrition", nutritionRouter)


// health check
app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })


// handling errors
app.use((error, req, res, next) => {
  const status = error.status || 500 ;
  const message = error.message;
  return res.status(status).json({ error: message || 'Something went wrong!' })
})



module.exports = app