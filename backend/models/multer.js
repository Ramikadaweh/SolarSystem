const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: String,
    extension: String,
    destination: String,
  },
  {
    collection: "files",
    timestamps: true,
  }
);

const Model = model("File", ModelSchema);
module.exports = Model;