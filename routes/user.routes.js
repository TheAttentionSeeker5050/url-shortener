'use strict'

// Import user controller
const userController = require("../controllers/user.controller")

// import mongoose
const mongoose = require("mongoose")

const users = [
  // This user is added to the array to avoid creating a new user on each restart
  {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      
      // This is the SHA256 hash for value of `password`
      password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
  }
]

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    res.locals.name = 'url-shortener'
    res.locals.page_name = "home"
    res.render('main')
  })

  app.get('/login', (req, res) => {
    res.locals.page_name = "login"
    res.locals.alert = ""
    res.render('main')
  })

  app.get('/register', (req, res) => {
    res.locals.page_name = "register"
    res.locals.alert = ""
    res.render('main')
  })

  app.get('/my-urls', (req, res) => {
    res.locals.page_name = "my-urls"
    res.render('main')
  })

  // app.post("/login", userController.login())
  // app.post("/register", (req, res) => {
  //   // we will use this function to post register

  //   // get the elements from the request body
  //   // const { firstName, lastName, email, password, passwordConfirmation } = req.body
  //   // console.log(req.body)
  // })

}

