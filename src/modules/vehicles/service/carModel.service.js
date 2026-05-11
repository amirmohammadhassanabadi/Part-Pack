// src/modules/vehicles/services/carModel.service.js
const CarModel = require("../models/carModel.model");
const Brand = require("../models/brand.model");
const slugify = require("slugify");

class CarModelService {
  async createCarModel({ name, brandId }) {
    const brand = await Brand.findById(brandId);
    if (!brand) throw new Error("Brand not found");

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await CarModel.findOne({ slug, brand: brandId });
    if (exists) {
      throw new Error("Car model already exists for this brand");
    }

    const carModel = await CarModel.create({
      name,
      slug,
      brand: brandId,
    });

    return carModel;
  }

  async getCarModels({ brandId, onlyActive = true }) {
    const filter = {};
    if (brandId) filter.brand = brandId;
    if (onlyActive) filter.isActive = true;

    return CarModel.find(filter)
      .populate("brand", "name slug")
      .sort({ name: 1 });
  }

  async getCarModelById(id) {
    const model = await CarModel.findById(id).populate("brand", "name slug");
    if (!model) throw new Error("Car model not found");
    return model;
  }

  async updateCarModel(id, data) {
    if (data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    if (data.brand) {
      const brandExists = await Brand.findById(data.brand);
      if (!brandExists) throw new Error("Brand not found");
    }

    const updated = await CarModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("Car model not found");
    return updated;
  }

  async deleteCarModel(id) {
    const deleted = await CarModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Car model not found");
    return deleted;
  }
}

module.exports = new CarModelService();
