var express = require("express");
const controller = require("../controllers/service-info");
var router = express.Router();

//create a service
router.post("/", controller.createService);
//read a service
router.get("/:id", controller.readService);
//delete a service
router.delete("/:id", controller.deleteService);
//read all service
router.get("/", controller.readAllService);

module.exports = router;