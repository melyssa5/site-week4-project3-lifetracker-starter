const express = require('express')
const router = express.Router()
const User = require("../models/user")
const security = require('../middleware/security')
const { UnauthorizedError } = require("../utils/errors")
const bcrypt = require('bcrypt')


// router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
//   try {
//     const { email } = res.locals.user
//     const user = await User.fetchUserByEmail(email)
//     return res.status(200).json({ user })
//   } catch (err) {
//     next(err)
//   }
// })


// POST /users/login - authenticate user by email address and password
router.post('/login', async (req, res, next) => {
  try {
    const userLogin = await User.authenticate(req.body)
    return res.status(200).json({ userLogin })
  } catch (err) {
    next(err)
  }
})

// POST /register - create a new user
router.post("/register", async function (req, res, next) {
    try {
      const user = await User.register(req.body)
      return res.status(201).json({ user })
    } catch (err) {
      next(err)
    }
  })

module.exports = router


