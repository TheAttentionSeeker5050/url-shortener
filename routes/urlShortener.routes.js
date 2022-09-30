'use strict'

// Import user controller
const userController = require("../controllers/user.controller")

// import mongoose
const mongoose = require("mongoose")

// import the user schema
const User = require("../models/user.model")

// import the token application
const jwt = require("jsonwebtoken")



// import middleware
const isAuth = require("../middleware/isAuth.middleware.js").isAuth

// import validator
const { check, validationResult } = require("express-validator")




module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {

    // check cookies
    res.locals.isAuth = req.session.isAuth

    // home page
    res.locals.name = 'url-shortener'
    res.locals.page_name = "home"
    res.render('main')
  })

  

  

  app.get('/my-urls', isAuth, (req, res, next) => {
    //  all my saved urls page

    // check cookies
    res.locals.isAuth = req.session.isAuth
    
    res.locals.page_name = "my-urls"
    res.render('main')
  })

  

}

