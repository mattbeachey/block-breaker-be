const express = require("express");
const router = express.Router();

const HiScores = require("../../models/HiScores");

router.post("/", (req, res) => {
  console.log(req.body);
  HiScores.create(req.body).then(hiScore => {
    res.json(hiScore);
  });
});

router.get("/", (req, res) => {
  HiScores.find({}).then(hiScores => {
    res.json({ hiScores });
  });
});

module.exports = router;
