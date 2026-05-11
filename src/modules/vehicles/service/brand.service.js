// src/modules/vehicles/services/brand.service.js
const Brand = require("../models/brand.model");
const slugify = require("slugify");

class BrandService {
  async createBrand({ name, logoUrl, country }) {
    const slug = slugify(name, { lower: true, strict: true });

    const exists = await Brand.findOne({ slug });
    if (exists) {
      throw new Error("Brand already exists");
    }

    const brand = await Brand.create({
      name,
      slug,
      logoUrl: logoUrl || null,
      country: country || null,
    });

    return brand;
  }

  async getBrands({ onlyActive = true } = {}) {
    const filter = {};
    if (onlyActive) filter.isActive = true;

    return Brand.find(filter).sort({ name: 1 });
  }

  async getBrandById(id) {
    const brand = await Brand.findById(id);
    if (!brand) throw new Error("Brand not found");
    return brand;
  }

  async updateBrand(id, data) {
    if (data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    const updated = await Brand.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("Brand not found");

    return updated;
  }

  async deleteBrand(id) {
    const deleted = await Brand.findByIdAndDelete(id);
    if (!deleted) throw new Error("Brand not found");
    return deleted;
  }
}

module.exports = new BrandService();
