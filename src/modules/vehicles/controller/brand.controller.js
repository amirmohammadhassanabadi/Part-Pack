// src/modules/vehicles/controllers/brand.controller.js
const brandService = require("../services/brand.service");

class BrandController {
  async createBrand(req, res, next) {
    try {
      const { name, logoUrl, country } = req.body;

      if (!name) {
        return res.status(400).json({ message: "name is required" });
      }

      const brand = await brandService.createBrand({ name, logoUrl, country });

      return res.status(201).json(brand);
    } catch (err) {
      // در نسخه ساده، فقط message برمی‌گردونیم
      return res.status(400).json({ message: err.message });
    }
  }

  async getBrands(req, res, next) {
    try {
      const onlyActive = req.query.onlyActive !== "false"; // پیش‌فرض true

      const brands = await brandService.getBrands({ onlyActive });

      return res.status(200).json(brands);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getBrandById(req, res, next) {
    try {
      const { id } = req.params;

      const brand = await brandService.getBrandById(id);

      return res.status(200).json(brand);
    } catch (err) {
      const status = err.message === "Brand not found" ? 404 : 500;
      return res.status(status).json({ message: err.message });
    }
  }

  async updateBrand(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updated = await brandService.updateBrand(id, data);

      return res.status(200).json(updated);
    } catch (err) {
      const status = err.message === "Brand not found" ? 404 : 400;
      return res.status(status).json({ message: err.message });
    }
  }

  async deleteBrand(req, res, next) {
    try {
      const { id } = req.params;

      const deleted = await brandService.deleteBrand(id);

      return res.status(200).json(deleted);
    } catch (err) {
      const status = err.message === "Brand not found" ? 404 : 400;
      return res.status(status).json({ message: err.message });
    }
  }
}

module.exports = new BrandController();
