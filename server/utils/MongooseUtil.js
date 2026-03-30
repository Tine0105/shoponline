// CLI: npm install mongoose --save
const mongoose = require("mongoose");
const MyConstants = require("./MyConstants");
const url =
  "mongodb+srv://" +
  MyConstants.DB_USER +
  ":" +
  MyConstants.DB_PASS +
  "@" +
  MyConstants.DB_SERVER +
  "/" +
  MyConstants.DB_DATABASE;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log(
      "Connected to " + MyConstants.DB_SERVER + "/" + MyConstants.DB_DATABASE,
    );
  })
  .catch((err) => {
    console.error(err);
  });
