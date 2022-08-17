var express = require("express");
const controller = require("../controllers/package");
var router = express.Router();

//create a package
router.post("/", controller.createPackage);
//read a package
router.get("/:id", controller.readPackage);
//delete a package
router.delete("/:id", controller.deletePackage);
//read all package
router.get("/", controller.readAllPackage);

router.put("/:id", controller.updatePackge);


module.exports = router;