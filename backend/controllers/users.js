const user = require("../models/users");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");

const dotenv = require("dotenv");
// require('dotenv').config()

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

class Controller {
  AllUsers(req,res, next) {
    user.find({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  Oneuser(req, res, next) {
    let { id } = req.params;
    user.findById(id, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  async InsertUser(req, res, next) {
    const mv = new user({
      username: req.body.username,
      tel: req.body.tel,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
    });
    mv.save({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  deleteUser(req, res, next) {
    let { id } = req.params;
    user.deleteOne({ _id: id }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  async UpdateUser(req, res, next) {
    const newUser = {
      username: req.body.username,
      tel: req.body.tel,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
    };
    let { id } = req.params;
    user.updateOne({ _id: id }, { $set: newUser }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  async validationUser(req, res, next) {
    const userr = await user.findOne({ email: req.body.email });
    if (!userr) return res.send("invalid email or password");
    if (req.body.password != userr.password)
      return res.send("invalid email or password");
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
  }
}

const controller = new Controller();
module.exports = controller;
