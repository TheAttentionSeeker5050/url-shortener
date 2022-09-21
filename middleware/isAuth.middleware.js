function isAuth (req, res, next) {
    // this moddleware function performs check to validate that the user has logged in
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect("/login")
    }
}

exports.isAuth = isAuth