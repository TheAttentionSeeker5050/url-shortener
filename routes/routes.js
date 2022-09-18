'use strict'

// For hashing passwords

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

}

