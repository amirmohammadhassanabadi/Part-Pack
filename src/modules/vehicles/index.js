const express = require("express");
const router = express.Router();

const brandRoutes = require("./routes/brand.routes");
const carModelRoutes = require("./routes/carModel.routes");

// تعریف پیشوند برای هر بخش از ماژول
router.use("/brands", brandRoutes);
router.use("/models", carModelRoutes);

module.exports = {
  vehicleRouter: router
};
