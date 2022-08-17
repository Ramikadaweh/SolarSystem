const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    collection: "contactUs",
  }
);

const Model = model("contactUs", ModelSchema);
module.exports = Model;