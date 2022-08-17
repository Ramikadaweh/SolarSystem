const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
  },
  {
    collection: "inverter",
  }
);

ModelSchema.pre(["find", "findOne"], function () {
  this.populate(["image"]);
});

const Model = model("inverter", ModelSchema);
module.exports = Model;
