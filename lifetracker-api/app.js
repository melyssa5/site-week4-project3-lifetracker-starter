const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config');
const { NotFoundError } = require("./utils/errors"); 
const security = require("./middleware/security");
const authRoutes = require('./routes/auth');
const exerciseRoutes = require('./routes/exercise');
const nutritionRoutes = require('./routes/nutrition');
const sleepRoutes = require('./routes/sleep');
const activityRoutes = require('./routes/activity');


const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
//middleware that checks if JWT token exists and verifies it if it does exist.
//if they exist, it extracts the user from the jwt token
//In all the future routes, this helps to know if the request is authenticated or not.
app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes); 

app.use("/exercise", exerciseRoutes);

app.use("/nutrition", nutritionRoutes); 

app.use("/sleep", sleepRoutes);

app.use("/activity", activityRoutes);

app.use("/", (req, res, next) => {
    return res.status(200).json({ ping: "pong" });
})

// basic error handling route
app.use((req, res, next) => {
    return next(new NotFoundError());
})


// basic error handling route
// case: for when a route is not found or does not exist
app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({ error: { message, status }})
})


module.exports = app