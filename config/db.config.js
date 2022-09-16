

const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = "mongodb+srv://nickcastellano:c5!sLDa&KS3raBty@cluster0.7pylz6o.mongodb.net/?retryWrites=true&w=majority"

const DataBaseClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

DataBaseClient.connect(err => {
  const url_shortener_db = client.db("test")
  // perform actions on the collection object
  DataBaseClient.close()
})

export {DataBaseClient}