const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const PORT = process.env.PORT || 5000;


// middleware 
app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://safeTourDB:jzTtrIdsfnKt8cgR@cluster0.n2defbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)



    const database = client.db("safeTourDB");
    const userCollection = database.collection("haiku");
    const spotsCollection = database.collection("spots");

    app.get('/spots', async (req, res)=>{
        const data = req.body;
        const result = await spotsCollection.find().toArray();
        res.send(result);
    })

    app.get('/spots/:id', async (req, res)=>{
        const id = req.params.id;
        const query = { _id : new ObjectId(id)}
        const result = await spotsCollection.findOne(query);
        res.send(result);
    })

    app.post('/users', async(req, res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    })


    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})