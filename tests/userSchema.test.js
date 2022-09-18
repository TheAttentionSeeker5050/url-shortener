// This tests the user schema or model

// import the db libraries
// import { MongoMemoryServer } from 'mongodb-memory-server'
const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose= require("mongoose")

// import the models
const User = require("../models/user.model")

describe('User schema test', () => {
    let mongod

    beforeAll(async () => {
      // we set the connection first
      mongod = await MongoMemoryServer.create()
      const uri = mongod.getUri()

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      
    })
    
    afterAll(async () => {
      // drops the databases and collections
      if (mongod) {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        await mongod.stop()
      }
    })

    afterEach(async () => {
      if (mongod) {
        // delete the collection
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
          await collection.deleteMany({});
        }
        
      }
    })

    
    it("User can be created correctly", async () => {
      const validUserData = {emailAddress:"user@email.com", firstName: "User", lastName: "Jones"}

      // add and save the new user
      const newUser = await User(validUserData)
      await newUser.save()
      
      // validate this user exists and has an object id
      expect(newUser._id).toBeDefined()

      // validate that the information on the db object matches the dummy data
      expect(newUser.emailAddress).toBe(validUserData.emailAddress)
      expect(newUser.firstName).toBe(validUserData.firstName)
      expect(newUser.lastName).toBe(validUserData.lastName)
    })

    // this test needs some refining - please follow the duplicated test to make this
    // it("Reject an email that is too short", async () => {
    //   const invalidUserData = {emailAddress:"a", firstName: "User", lastName: "Jones"}

    //   // attempt to add a new user
    //   const newUser = await User(invalidUserData)
    //   await newUser.save()

    //   // this element should not exist
    //   retrievedUser = await User.find({emailAddress: userData.emailAddress})

    //   expect(retrievedUser).toBeNull()
      
    // })

    it("Create an user and retrieve it", async () => {
      const userData = {emailAddress:"user@email.com", firstName: "User", lastName: "Jones"}

      // add and save the new user
      const newUser = await User(userData)
      await newUser.save()

      // retrieve the stored user
      retrievedUser = await User.find({emailAddress: userData.emailAddress})


      // validate stored user
      expect(retrievedUser[0].emailAddress).toBe(userData.emailAddress)

    })

    // create duplicate users
    // it("Disallow duplicate entries", async () => {

      
    //   expect(async () => {
    //     const userData = {emailAddress:"user@email.com", firstName: "User", lastName: "Jones"}
  
        

    //     const newUser1 = await User(userData)
    //     await newUser1.save()
  
    //     const newUser2 = await User(userData)
    //     await newUser2.save()

    //     retrievedUser = await User.find({emailAddress: userData.emailAddress})

    //   }).toThrow()


    // })

  })