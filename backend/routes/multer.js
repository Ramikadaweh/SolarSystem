var express = require("express");
var router = express.Router();
var controller = require("../controllers/multer");

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post("/", controller.upload.single("image"), controller.post);
router.delete('/:id', controller.delete);

module.exports = router;
