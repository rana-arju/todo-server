const express = require("express");
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb")
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
    const todoComplateCollections = client.db("todoCollection").collection("complateList");



    //todo list post
    app.post("/todo", async(req, res) => {
        const list = req.body;
         const result = await todoAddCollections.insertOne(list);
        res.send(result);
    })
   //todo list Get
   app.get('/todo', async(req, res) => {
      const lists = await todoAddCollections.find().toArray();
      res.send(lists);
   });
   //todo one list update
   app.put('/todo/:id', async(req, res) => {
      const lists = await todoAddCollections.find({}).toArray();
      res.send(lists);
   });
   //todo list complate
  //  app.put('/todo/complate/:id', async(req, res) => {
  //     const id = req.params.id;
  //     const query = {_id: ObjectId(id).trim()};
  //     const options = {upsert: true};
  //     const updateDoc = {
  //       $set:{
  //         complate: true,
  //       }
  //     };
  //     const result = await todoAddCollections.updateOne(query, updateDoc, options);
  //     // res.send(result);
  //  });
   //todo list Get
   app.delete('/todo/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)}
    const result = await todoAddCollections.deleteOne(query);
      res.send(result);
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