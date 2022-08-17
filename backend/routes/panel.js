var express = require("express");
const controller = require("../controllers/panel");
var router = express.Router();

//create a panel
router.post("/", controller.createPanel);
//read a panel
router.get("/:id", controller.readPanel);
//delete a panel
router.delete("/:id", controller.deletePanel);
//read all panel
router.get("/", controller.readAllPanel);

router.put("/:id", controller.UpdatePanel);

module.exports = router;