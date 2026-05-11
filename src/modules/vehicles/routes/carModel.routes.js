const express = require("express");
const router = express.Router();
const carModelController = require("../controllers/carModel.controller");

// مسیرهای مربوط به مدل خودرو
router.post("/", carModelController.createCarModel);
router.get("/", carModelController.getCarModels);
router.get("/:id", carModelController.getCarModelById);
router.patch("/:id", carModelController.updateCarModel);
router.delete("/:id", carModelController.deleteCarModel);

module.exports = router;
