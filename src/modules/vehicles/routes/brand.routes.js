const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");

// مسیرهای مربوط به برند
router.post("/", brandController.createBrand);
router.get("/", brandController.getBrands);
router.get("/:id", brandController.getBrandById);
router.patch("/:id", brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
