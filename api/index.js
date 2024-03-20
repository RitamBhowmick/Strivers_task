const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/user.models.js');
const dotenv = require("dotenv");

dotenv.config({
  path: './.env'
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  credentials: true,
  origin: 'https://strivers-task.vercel.app',
  methods: ["POST", "GET"],
}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://iammritam11:6T0gvwG8LTVrOdHU@cluster0.s97rr6p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
mongoose.connection
    .once("open", () => { console.log("Connected to DB....."); })
    .on("error", () => { console.log("problem to connect to DB ..!!!!!");
});

app.use('/', (req, res) => {
  res.json("Test Ok")
});

// API Endpoints
app.post('/submit', async (req, res) => {
  const { username, language, stdin, sourceCode } = req.body;
  const timestamp = new Date();
  const userData = await UserModel.create({
    username,
    language,
    stdin,
    sourceCode,
    timestamp,
  });

  userData.save()
  .then(() => {
      res.status(201).json('Data saved successfully!!!'); // Return the saved code
  })
  .catch(err => {
      res.status(500).json({ error: err.message }); // Return an error if saving fails
  });
});

app.get("/snippets", (req, res) => {

      UserModel.find()
      .then((e) => {
          res.status(200).send(e)
      })
      .catch(() => {
          res.send("No records found!!")
      })
    });

app.post('/logout', (req,res) => {
  res.status(200).json("Logout succesfully!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});