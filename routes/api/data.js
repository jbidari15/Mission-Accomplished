const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Data = require("../../models/Data");

//GET api/data
router.get("/", (req, res) => {
  Data.find()
    .sort({ date: -1 })
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ noDataFound: "No Data found" }));
});

// POST api/data
router.post("/", (req, res) => {
  const newData = new Data({
    searchValue: req.body.searchValue,
    searchResult: req.body.searchResult
  });

  newData.save().then(data => res.json(data));
});

router.delete("/", (req, res) => {
  Data.remove({}, () => res.send("all data removed"));
});
module.exports = router;
