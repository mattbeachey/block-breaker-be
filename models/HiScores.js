const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HiScoreSchema = new Schema({
  initials: {
    type: Schema.Types.String,
    required: true
  },
  score: {
    type: Schema.Types.Number,
    required: true
  }
});

module.exports = HiScore = mongoose.model("hiscores", HiScoreSchema);
