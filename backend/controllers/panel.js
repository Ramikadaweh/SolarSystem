const Model = require("../models/panel");

class Controller {
  // callback functions used in routes
  createPanel(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readAllPanel(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readPanel(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  deletePanel(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  async UpdatePanel(req, res, next) {
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