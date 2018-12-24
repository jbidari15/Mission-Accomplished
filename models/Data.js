const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Data Schema
const DataSchema = new Schema({
  searchValue: {
    type: String,
    required: true
  },
  searchResult: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = data = mongoose.model("data", DataSchema);
