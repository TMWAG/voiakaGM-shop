const { Parameter } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class ParameterController {
  static async create(req, res, next) {
    try {
      const { parameterName } = req.body;
      const parameter = await Parameter.create({ parameterName });
      return res.json(parameter);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const parameters = await Parameter.findAll({
        attributes: ["id", "parameterName"],
      });
      return res.json(parameters);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getOneById(req, res, next) {
    try {
      const { id } = req.params;
      const parameter = await Parameter.findOne({
        attributes: ["id", "parameterName"],
        where: { id },
      });
      return res.json(parameter);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changeNameById(req, res, next) {
    try {
      const { id, parameterName } = req.body;
      const parameter = await Parameter.update(
        { parameterName },
        { where: { id } }
      );
      return res.json(parameter);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.body;
      const parameter = await Parameter.destroy({ where: { id } });
      return res.json(parameter);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
};
