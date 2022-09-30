'use strict'

// Import user controller
const userController = require("../controllers/user.controller")



// import middleware
const isAuth = require("../middleware/isAuth.middleware.js").isAuth

// import validator
const { check, validationResult } = require("express-validator")

// import url model
const Urls = require("../models/urls.model")

// import the random url generator
const makeShortURL = require("../scripts/generateRandomUrl").getRandomURL

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

  app.get("/new-url", (req, res) => {
    res.redirect("/my-urls")
  })


    
  app.post("/new-url", isAuth, async (req, res) => {
    // create a new short url from a longer one

    // first set some variables
    var urlToShorten = req.body.inputURL
    const userID = req.session.userID
    const shortURL = makeShortURL()


    // this will be changed  it is just for ilustration purposes
    if (urlToShorten == "" || urlToShorten == null) {
        // we need to add a validator but will do it later in the future
        res.status(400).send("Invalid request. Please make sure the long URL you want to shorten is correct")
    } else {
        

        // firs we make sure that the url is absolute
        if (urlToShorten.startsWith("https://" || urlToShorten.startsWith("http://"))) {
           // I can leave this empty 
        } else {
            urlToShorten = "https://" + urlToShorten
        }

        const findShortURLInDB = await Urls.findOne({shortUrl: shortURL})

        while (true) {

            // first we make sure that the url identifier does not already exist
            if (!findShortURLInDB) {

                // if so create new entry in mongo
                const urlDBEntry = await Urls.create({
                    urlOwner: userID,
                    originalUrl: urlToShorten,
                    shortUrl: shortURL,
                    dateCreated: new Date(),
                    expiryDate: new Date().getDate()+30
                }, (err, doc) => {

                    // handling errors
                    if (err) {
                        res.status(400).send("Something went wrong in creating the new shortened URL. Please try next time")
                    } else {
                        // console.log("Shortened url is:", shortURL)
                        res.redirect("/my-urls")
                    }
                    
                })

                console.log(shortURL)
                
                break
            } else {
                // otherwise make new random string
                shortURL = makeShortURL()
                
            }
                
        } 


    }
  })

  app.get("/urls/:urlIdentifier", async (req, res) => {
    const urlIdentifier = req.params.urlIdentifier

    const getURLFromDB = await Urls.findOne({shortUrl: urlIdentifier})

    // const longURL = getURLFromDB.originalUrl

    // console.log("Long url: ",longURL)
    // console.log("Query response: ",getURLFromDB)
    // res.status(200).send(`This is an address for short url:${urlIdentifier}`)

    if (getURLFromDB) {
        // if we could find this short url in our db
        res.redirect(getURLFromDB.originalUrl)
    } else {
        // in case we cannot find the short url
        res.status(404).send("<h2>Error 404</h2><p>URL not found</p>")
    }
  })
  

  app.get('/my-urls', isAuth, (req, res, next) => {
    //  all my saved urls page

    // check cookies
    res.locals.isAuth = req.session.isAuth

    res.locals.page_name = "my-urls"
    res.render('main')
  })

  // I have to create:
  // post and get request for new shortened url create poge  
  // url redirect page   
  // get element, put and delete request for current made shortened urls
  // refine my urls page
  // a basic dashboard
  // Idk what else to do 

  

}

