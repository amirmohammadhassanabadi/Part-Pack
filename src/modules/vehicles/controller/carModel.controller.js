// src/modules/vehicles/controllers/carModel.controller.js
const carModelService = require("../services/carModel.service");

class CarModelController {
  async createCarModel(req, res, next) {
    try {
      const { name, brandId, generation } = req.body;

      if (!name || !brandId) {
        return res
          .status(400)
          .json({ message: "name and brandId are required" });
      }

      const carModel = await carModelService.createCarModel({
        name,
        brandId,
        generation,
      });

      return res.status(201).json(carModel);
    } catch (err) {
      const status =
        err.message === "Brand not found" ||
        err.message.includes("Car model already exists")
          ? 400
          : 500;

      return res.status(status).json({ message: err.message });
    }
  }

  async getCarModels(req, res, next) {
    try {
      const { brandId } = req.query;
      const onlyActive = req.query.onlyActive !== "false";

      const carModels = await carModelService.getCarModels({
        brandId,
        onlyActive,
      });

      return res.status(200).json(carModels);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getCarModelById(req, res, next) {
    try {
      const { id } = req.params;

      const model = await carModelService.getCarModelById(id);

      return res.status(200).json(model);
    } catch (err) {
      const status = err.message === "Car model not found" ? 404 : 500;
      return res.status(status).json({ message: err.message });
    }
  }

  async updateCarModel(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updated = await carModelService.updateCarModel(id, data);

      return res.status(200).json(updated);
    } catch (err) {
      const badReqMessages = ["Car model not found", "Brand not found"];
      const status = badReqMessages.includes(err.message) ? 400 : 500;

      return res.status(status).json({ message: err.message });
    }
  }

  async deleteCarModel(req, res, next) {
    try {
      const { id } = req.params;

      const deleted = await carModelService.deleteCarModel(id);

      return res.status(200).json(deleted);
    } catch (err) {
      const status = err.message === "Car model not found" ? 404 : 400;
      return res.status(status).json({ message: err.message });
    }
  }
}

module.exports = new CarModelController();
