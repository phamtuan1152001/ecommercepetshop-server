const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const New = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("New", New);
