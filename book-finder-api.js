// Express server setup
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// MongoDB Atlas connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vladvladimirich:<qp65DaerfTKPJ0aW>@cluster0.aqq5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Book model
const Book = mongoose.model('Book', {
  title: String,
  author: String,
  genre: String,
  releaseDate: Date,
  information: String,
  rating: Number
});

// API endpoints
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/books', async (req, res) => {
  const { title, author, genre, releaseDate, information, rating } = req.body;
  const newBook = new Book({ title, author, genre, releaseDate, information, rating });
  await newBook.save();
  res.json(newBook);
});

// Other CRUD endpoints and search functionalities can be added here

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});