const { Status } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class StatusController {
  static async create(req, res, next) {
    try {
      const { statusName } = req.body;
      const status = await Status.create({ statusName });
      return res.json(status);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getOneById(req, res, next) {
    try {
      const { id } = req.params;
      const status = await Status.findOne({ where: { id } });
      return res.json(status);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const statuses = await Status.findAll();
      return res.json(statuses);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changeNameById(req, res, next) {
    try {
      const { id, statusName } = req.body;
      const status = await Status.update({ statusName }, { where: { id } });
      return res.json(status);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.body;
      const status = await Status.destroy({ where: { id } });
      return res.json(status);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
};
