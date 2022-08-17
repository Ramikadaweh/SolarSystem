var express = require("express");
const controller = require("../controllers/ampere");
var router = express.Router();

//create ampere
router.post("/", controller.createAmpere);
//read ampere
router.get("/:id", controller.readAmpere);
//delete ampere
router.delete("/:id", controller.deleteAmpere);
//read all amperes
router.get("/", controller.readAllAmpere);

router.put("/:id", controller.UpdateAmpere);

module.exports = router;