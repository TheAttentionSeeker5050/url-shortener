'use strict'

// Import user controller
const userController = require("../controllers/user.controller")

// import mongoose
const mongoose = require("mongoose")

// import the user schema
const User = require("../models/user.model")

// import the token application
const jwt = require("jsonwebtoken")

// import our encryption library
const bcrypt = require("bcrypt")




module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    // home page
    res.locals.name = 'url-shortener'
    res.locals.page_name = "home"
    res.render('main')
  })

  app.get('/login', (req, res) => {
    // login form page
    res.locals.page_name = "login"
    res.locals.alert = ""
    res.render('main')
  })

  app.get('/register', (req, res) => {
    // register form page
    res.locals.page_name = "register"
    res.locals.alert = ""
    res.render('main')
  })

  app.get('/my-urls', (req, res) => {
    //  all my saved urls page
    res.locals.page_name = "my-urls"
    res.render('main')
  })

  app.post("/register", async (req, res) => {
    // to register a new user

    // save the form information
    const formData = { 
      emailAddress: req.body.emailAddress, 
      password: req.body.password,
      firstName: req.body.firstName, 
      lastName: req.body.lastName 
    }

    // you can add more email validators later
    if (formData.emailAddress) {
      
      // validate that the password and pass confirmation match
      if (formData.password == req.body.passwordConfirmation) {

        // you can add more passsword confirmation options
        try {

          // try to create a new user
          const user = await User.create(
            formData
          , function(err, submittedForm) {

            // handling user creation errors
            if (err) {

              // on errors on user creation
              res.status(409).send(`Could not create new account not on user creation. Conflict with our server. Error: \n ${err}`)
            } else {

              // redirect to the main page
              res.status(200).redirect("/")
            }
          })
          // I dont think we need a catch at this moment
        } catch  (err) {
          res.status(409).send('Could not create new account on catch. Conflict with our server')
        }
      }
    } else {
      res.status(409).send('Password don\'t match')
    }
  })

  app.post("/login", async (req, res) => {
    // to login 

    // save the form information
    const formData = { 
      emailAddress: req.body.emailAddress, 
      password: req.body.password
    }

    // search the user in our database
    const user = await User.findOne({emailAddress: formData.emailAddress})

    // in case the user does not exist
    if (!user) {
      res.status(401).send("User was not found")
    }

    // if the password matches the one on the database
    if (bcrypt.compareSync(formData.password, user.password)) {

      // create a token 
      const token = jwt.sign({user}, process.env.JSON_WEB_TOKEN, {
        expiresIn: "24h"
      })

      // send token to the client web browser
      res.json({
        user: user.emailAddress,
        accessToken: token, 
        message: "User logged in"
      })

      

    } else {

      // in case that the passwords don't match
      res.status(401).json({
        message: "Could not authenticate"
      })
    }

  })

}

