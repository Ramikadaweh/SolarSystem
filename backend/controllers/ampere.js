const Model = require("../models/ampere");

class Controller {
  // callback functions used in routes
  createAmpere(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readAllAmpere(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readAmpere(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  deleteAmpere(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  async UpdateAmpere(req, res, next) {
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