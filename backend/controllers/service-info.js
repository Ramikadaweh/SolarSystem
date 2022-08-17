const Model = require("../models/service-info");

class Controller {
  // callback functions used in routes
  createService(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readAllService(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  readService(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  deleteService(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }
}
const controller = new Controller();
module.exports = controller;