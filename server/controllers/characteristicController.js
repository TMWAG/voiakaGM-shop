const { Characteristic } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class CharacteristicController {
  static async create(req, res, next) {
    try {
      const { parameterId, productId, value } = req.body;
      const characteristic = await Characteristic.create({
        parameterId,
        productId,
        value,
      });
      return res.json(characteristic);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getOneById(req, res, next) {
    try {
      const { id } = req.params;
      const characteristic = await Characteristic.findOne({
        where: { id },
        attributes: ["id", "value", "productId", "parameterId"],
      });
      return res.json(characteristic);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAllByProductId(req, res, next) {
    try {
      const { productId } = req.params;
      const characteristics = await Characteristic.findAll({
        where: { productId },
        attributes: ["id", "value", "parameterId"],
      });
      return res.json(characteristics);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changeParameterById(req, res, next) {
    try {
      const { id, parameterId } = req.body;
      const characteristic = await Characteristic.update(
        { parameterId },
        { where: { id } }
      );
      return res.json(characteristic);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changeValueById(req, res, next) {
    try {
      const { id, value } = req.body;
      const characteristic = await Characteristic.update(
        { value },
        { where: { id } }
      );
      return res.json(characteristic);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.body;
      const characteristic = await Characteristic.destroy({ where: { id } });
      return res.json(characteristic);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteAllByProductId(req, res, next) {
    try {
      const { productId } = req.body;
      const characteristics = await Characteristic.destroy({
        where: { productId },
      });
      return res.json(characteristics);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
};
