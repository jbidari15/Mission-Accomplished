const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const data = require("./routes/api/data");

const path = require("path");

const app = express();

//process.env.PORT for using the remote port when hosted
const port = process.env.PORT || 5000;

//using the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//getting the MongoDB URI from mLab and connecting to MongoDB .
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/data", data);

app.listen(port, () => console.log(`Server is running on port ${port}`));
