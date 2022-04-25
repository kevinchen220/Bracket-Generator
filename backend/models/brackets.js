const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  }
})

const bracketsSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  bracket: {
    type: [[Number]],
    required: true,
    default: [],
  },
  names: {
    type: [playerSchema],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("Brackets", bracketsSchema);
