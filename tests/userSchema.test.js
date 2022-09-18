// This tests the user schema or model
const { MongoUnexpectedServerResponseError } = require('mongodb')
const mongoose = require('mongoose')

// envirement variables
require("dotenv").config()

const Users = require("../models/user.model")

describe('User schema test', () => {
    let connection
    let DB


    beforeAll(() => {
      // we set the connection first
      mongoose.connect(process.env.MONGODB_URL)
        .then("Database connected successfully")
        .catch(err => {
          console.error("Connection error on DB", err.message)
        })

      DB = mongoose.connection


    })
    afterEach(() => {
      console.log("this should delete something")

      
    })



    // // I will remove this later. I am designing the test at this moment
    // it('adds 1 + 2 to equal 3', () => {
    //   expect(1+2).toBe(3);
    // })

    // Test that empty emails users cannot be created
    // it("test that empty username emails cannot be created", async () => {
    //   const dummyUser = {email: ""}

    //   const newUser = new Users(dummyUser)

    //   await newUser.save()

    //   const insertedUser = await Users.find({email: ""})

    //   expect(dummyUser).toEqual(insertedUser)

  })
})