'use strict'
module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    res.locals.name = 'url-shortener'
    res.locals.page_name = "home"
    res.render('main')
  })

  app.get('/login', (req, res) => {
    res.locals.page_name = "login"
    res.render('main')
  })

  app.get('/register', (req, res) => {
    res.locals.page_name = "register"
    res.render('main')
  })

  app.get('/my-urls', (req, res) => {
    res.locals.page_name = "my-urls"
    res.render('main')
  })

}

