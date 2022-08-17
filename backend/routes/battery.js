var express = require("express");
const controller = require("../controllers/battery");
var router = express.Router();

//create a battery
router.post("/", controller.createBattery);
//read a battery
router.get("/:id", controller.readBattery);
//delete a battery
router.delete("/:id", controller.deleteBattery);
//read all battery
router.get("/", controller.readAllBattery);

router.put("/:id", controller.UpdateBattery)

module.exports = router;