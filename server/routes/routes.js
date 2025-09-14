const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/drugController");
const validateDrug = require("../middleware/validateDrug");

router.get("/", ctrl.getAll);
router.post("/", validateDrug, ctrl.create);
router.put("/:id", validateDrug, ctrl.update);
router.delete("/:id", ctrl.remove);
router.post("/:id/purchase", ctrl.purchase);

module.exports = router;
