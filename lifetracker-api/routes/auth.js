const express = require('express')
const router = express.Router()
const User = require("../models/user")
const security = require('../middleware/security')
const {createUserJwt} = require("../utils/tokens")
const { UnauthorizedError } = require("../utils/errors")


// POST /users/login - authenticate user by email address and password
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user: user, token: token })
  } catch (err) {
    next(err)
  }
})

// POST /register - create a new user
router.post("/register", async function (req, res, next) {
    try {
      const user = await User.register(req.body)
      const token = createUserJwt(user);
      console.log("token", token);
      return res.status(201).json({ user: user, token:token})
    } catch (err) {
      next(err)
    }
  })


  router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {

    try {
      const { email } = res.locals.user;
      const user = await User.fetchUserByEmail(email);
      const publicUser = User.createPublicUser(user);
      return res.status(200).json({ user: publicUser });
  
    } catch (error) {
      next(error); 
    }
  })


module.exports = router


