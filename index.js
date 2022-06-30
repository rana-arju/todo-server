const express = require("express");
const {MongoClient, ServerApiVersion} = require("mongodb")
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sptt8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const todoAddCollections = client.db("todoCollection").collection("addlist");



    //todo list post
    app.post("/todo", async(req, res) => {
        const list = req.body;
         const result = await todoAddCollections.insertOne(list);
        res.send(result);
    })
   //todo list Get
   app.get('/todo', async(req, res) => {
      const lists = await todoAddCollections.find({}).toArray();
      res.send(lists);
   });


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running....')
});
app.listen(port, () => {
    console.log('server is running port of', port);
})