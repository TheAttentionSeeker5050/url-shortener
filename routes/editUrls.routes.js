'use strict'
// this file will contain the routes to edit, delete urls records



// import the user schema
const User = require("../models/user.model")

// import the url schema
const Urls = require("../models/urls.model")
const { update, findOne } = require("../models/user.model")

// import middleware
const isAuth = require("../middleware/isAuth.middleware.js").isAuth

// // import validator
// const { check, validationResult } = require("express-validator")

const transformUrl = require("../scripts/transformUrl").transformUrl



module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers

  app.get("/urls/update/:urlIdentifier", async (req, res) => {

    // get the alert element
    res.locals.alert = "something"

    // get templating parameters
    res.locals.page_name = "edit-url"
    res.locals.urlId = req.params.urlIdentifier

    // we find the url data first to display it in the form
    const urlData = await Urls.findOne({shortUrl: res.locals.urlId})

    console.log(urlData)
    res.locals.urlData = urlData

    // check cookies
    res.locals.isAuth = req.session.isAuth

    res.render('main')

    
  })

  app.get("/urls/delete/:urlIdentifier", (req, res) => {

    // get templating parameters
    res.locals.page_name = "delete-url"
    res.locals.urlId = req.params.urlIdentifier

    // check cookies
    res.locals.isAuth = req.session.isAuth


    res.render('main' )

    
  })

  
  
  app.post("/urls/update/:urlIdentifier", async (req, res) => {
    // modify a url

    // get url identifier
    const urlIdentifier = req.params.urlIdentifier

    // now get the new url data from the form
    let updatedUrl = req.body.originalUrl

    // we transform the url to absolute address
    updatedUrl = transformUrl(updatedUrl)

    if (updatedUrl == false) {
      // if the record is blank
      res.status(401).send("Error 401: you cannot replace with blank url")
    } else {
      // update the url
      let updatedRecord = await Urls.findOneAndUpdate({shortUrl: urlIdentifier}, {originalUrl: updatedUrl})
      res.redirect("/my-urls")

    }

  

    // check if roll over the expiry date to 1 month more
    // do something


  })

  app.post("/urls/delete/:urlIdentifier", async (req, res) => {
    // modify a url

    // get url identifier
    const urlIdentifier = req.params.urlIdentifier

    await Urls.findOneAndDelete({shortUrl: urlIdentifier})


    res.redirect("/my-urls")
  })

  

}

