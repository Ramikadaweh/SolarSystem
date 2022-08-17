var express = require("express");
const controller = require("../controllers/contactUs");
var router = express.Router();

//create a message
router.post("/", controller.createMessage);
//read a message
router.get("/:id", controller.readMessage);
//delete a message
router.delete("/:id", controller.deleteMessage);
//read all message
router.get("/", controller.readAllMessage);

module.exports = router;