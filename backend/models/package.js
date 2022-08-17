const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    amperes: {
      type: Schema.Types.ObjectId,
      ref: "ampere",
      required: true,
    },
    inverters: {
      type: Schema.Types.ObjectId,
      ref: "inverter",
      required: true,
    },
    batteries: 
      {
        battery: {
          type: Schema.Types.ObjectId,
          ref: "battery",
          required: true,
        },
        bquantity: { type: Number, required: true },
      },
    
    panels: 
      {
        panel: { type: Schema.Types.ObjectId, ref: "panel", required: true },
        pquantity: { type: Number, required: true },
      },
    
  },
  {
    collection: "package",
  }
);

ModelSchema.pre(["find", "findOne"], function () {
  this.populate([
    "batteries.battery",
    "panels.panel",
    "inverters",
    "amperes",
  ]);
});

const Model = model("package", ModelSchema);
module.exports = Model;
