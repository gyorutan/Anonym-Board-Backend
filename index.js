const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

// Express
const app = express();

// Dotenv
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));


// Routes
readdirSync("./routes").map((parameter) => app.use("/", require("./routes/" + parameter)));

// Checking Server
app.listen(process.env.PORT, () => {
  try {
    console.log(`[서버 연결 OK] [포트 : ${process.env.PORT}]`);
    mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("[DB 연결 OK] [DB : MongoDB]"))
    .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});
