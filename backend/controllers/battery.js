const Model = require("../models/battery");

class Controller {
  // callback functions used in routes
  createBattery(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readAllBattery(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readBattery(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  deleteBattery(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  async UpdateBattery(req, res, next) {
    let body = req.body;
    let { id } = req.params;
    Model.updateOne(
      { _id: id },
      {
        $set: body,
      },
      (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      }
    );
  }
}
const controller = new Controller();
module.exports = controller;