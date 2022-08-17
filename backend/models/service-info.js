const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    packages: {
      type: Schema.Types.ObjectId,
      ref: "package",
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
  },
  {
    collection: "service-info",
  }
);

ModelSchema.pre(["find", "findOne"], function () {
    this.populate(["packages"]);
  });
  

const Model = model("service-info", ModelSchema);
module.exports = Model;