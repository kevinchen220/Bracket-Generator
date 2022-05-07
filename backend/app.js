const express = require("express");
const mongoose = require("mongoose");
const Brackets = require("./models/brackets");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://kevinchen220:coolkevin@brackets.c3od9.mongodb.net/Brackets?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  // perform actions on the collection object
  client.close();
});

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://bracketgenerator-220.web.app",
    "https://bracketgenerator-220.firebaseapp.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  const bracket = [[1, 2], [3]];
  const names = [];
  res.json({
    bracket,
    names,
  });
});

app.post("/storeBracket", async (req, res) => {
  url = req.body.url;
  bracket = req.body.bracket;
  names = req.body.names;
  const tournament = await Brackets.findOne({ url });
  if (tournament) {
    tournament.bracket = bracket;
    tournament.names = names;
    tournament.save();
  } else {
    await Brackets.create({
      url: req.body.url,
      bracket: req.body.bracket,
      names: req.body.names,
    });
  }
  res.json({
    url,
    bracket,
    names,
  });
});

app.get("/:id", async (req, res) => {
  const { id: url } = req.params;
  try {
    const tournament = await Brackets.findOne({ url });
    let bracket = tournament.bracket;
    let names = tournament.names;
    if (tournament) {
      res.json({
        bracket,
        names,
      });
    }
  } catch (error) {
    const bracket = null;
    const names = null;
    res.json({
      bracket,
      names,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
