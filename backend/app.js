const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://bill1234:billdelvin1234@devconnector-yuje7.mongodb.net/mean?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static("backend/images"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH, OPTIONS"
  );
  next();
});

app.use("/api", postRoutes);
app.use("/api", userRoutes);

module.exports = app;
