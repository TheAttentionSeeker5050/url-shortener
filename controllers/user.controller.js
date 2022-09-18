const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function register(req, res) {
    // we will use this function to post register

    // get the elements from the request body
    const { firstName, lastName, email, password, passwordConfirmation} = req.body
    console.log("request body", req.body)

    // if (password == passwordConfirmation) {

    //     const user = await User.create({
    //         emailAddress: email, password: password, firstName: firstName, lastName: lastName
    //     }
    //     // , function (err, docs) {
    //     //     if (err) {
    //     //         res.status(409).send('Could not create new account. Conflict with our server')
    //     //     }
    //     // }
    //     )
    //     user.save()
    
    //     res.json({
    //         user, message: "Account was created"
    //     })

    // } else {
    //     res.status(401).send("Password don't match")
    // }


}


async function login(req, res) {
    // get the elements from the request body
    const {email, password} = req.body

    // find the user in db
    const user = await User.findOne({
        emailAddress: email
    })

    // if user could not be found
    if (!user) {
        res.status(404).send("User was not found")
    }

    // if the user's password input matches the one on db
    if (bcrypt.compareSync(password, user.password)) {
        // create a web token
        const token = jwt.sign({user}, process.env.JSON_WEB_TOKEN, {
            expiresIn: "24h"
        })

        res.json({
            user: user,
            token: token, 
            message: "User was logged in"
        })
    } else {
        res.status(401).json({
            message: "Incorrect password"
        })
    }

}

async function updatePassword(req, res) {

    console.log("here should go the update password controller")

}

async function updateUserData(req, res) {

    console.log("here should go the update user data controller")

}

module.exports = {
    register,
    login
}

