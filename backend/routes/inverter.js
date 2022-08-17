var express = require("express");
const controller = require("../controllers/inverter");
var router = express.Router();

//create a inverter
router.post("/", controller.createInverter);
//read a inverter
router.get("/:id", controller.readInverter);
//delete a inverter
router.delete("/:id", controller.deleteInverter);
//read all inverter
router.get("/", controller.readAllInverter);

router.put("/:id", controller.updateInverter);

module.exports = router;