const express = require("express");
const router = express.Router();

const functionsController = require("../controllers/function");

router.get("/many/:ids", functionsController.getManyById);

router.get("/", functionsController.get);

router.get("/:id", functionsController.getById);

router.post("/", functionsController.create);

router.put("/:id", functionsController.edit);

router.delete("/:id", functionsController.delete);

module.exports = router;