const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  {
    collection: "ampere",
  }
);

const Model = model("ampere", ModelSchema);
module.exports = Model;