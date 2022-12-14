'use strict'
const express = require('express')
const httpErrors = require('http-errors')
const path = require('path')
const ejs = require('ejs')
const pino = require('pino')
const pinoHttp = require('pino-http')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// the session variables
const session = require('express-session')
const MongoStore = require('connect-mongo')

module.exports = function main (options, cb) {

  // dotenv for environment variables
  require("dotenv").config()

  // Set default options
  const ready = cb || function () {}
  const opts = Object.assign({
    // Default options
  }, options)

  const logger = pino()

  // Server state
  let server
  let serverStarted = false
  let serverClosing = false

  // use our database
  const db = require("./config/db.config")
  db.on("error", console.error.bind(console, "mongodb connection error"))

  
  // Setup error handling
  function unhandledError (err) {
    // Log the errors
    logger.error(err)

    // Only clean up once
    if (serverClosing) {
      return
    }
    serverClosing = true
    
    // If server has started, close it down
    if (serverStarted) {
      server.close(function () {
        process.exit(1)
      })
    }
  }

  process.on('uncaughtException', unhandledError)
  process.on('unhandledRejection', unhandledError)
  
  // Create the express app
  const app = express()



  // use express session to store user sessions and retrieve them
  app.use(session({
    secret: process.env.SESSION_SECRET_TOKEN,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URL})
  }))
  
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  
  // Template engine
  app.engine('html', ejs.renderFile)
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'html')
  
  // Common middleware
  // I sometimes comment the line below to not have logs in the console
  // app.use(pinoHttp({ logger }))
  
  // Use static files
  app.use('/javascript', express.static('public/javascript'))
  app.use('/css', express.static('public/css'))
  app.use('/imgs', express.static('public/imgs'))
  
  // Register routes
  // @NOTE: require here because this ensures that even syntax errors
  // or other startup related errors are caught logged and debuggable.
  // Alternativly, you could setup external log handling for startup
  // errors and handle them outside the node process.  I find this is
  // better because it works out of the box even in local development.
  require('./routes/user.routes')(app, opts)
  require('./routes/urlShortener.routes')(app, opts)
  require('./routes/editUrls.routes')(app, opts)


  
  // Common error handlers
  app.use(function fourOhFourHandler (req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`))
  })
  
  
  app.use(function fiveHundredHandler (err, req, res, next) {
    if (err.status >= 500) {
      logger.error(err)
    }
    res.locals.name = 'url-shortener'
    res.locals.error = err
    res.status(err.status || 500).render('error')
  })
  
  // Start server
  server = app.listen(opts.port, opts.host, function (err) {
    if (err) {
      return ready(err, app, server)
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error('Server was closed before it could start'))
    }

    serverStarted = true
    const addr = server.address()
    logger.info(`Started at ${opts.host || addr.host || 'localhost'}:${addr.port}`)
    ready(err, app, server)
  })
}

