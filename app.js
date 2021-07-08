require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Db ready state: ", mongoose.connection.readyState);
    console.log("Connected to db");
  }
);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
