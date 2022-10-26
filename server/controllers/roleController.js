const { Role } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class RoleController {
  static async create(req, res, next) {
    try {
      const { roleName } = req.body;
      const role = await Role.create({ roleName });
      return res.json(role);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const roles = await Role.findAll();
      return res.json(roles);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getOneById(req, res, next) {
    try {
      const { id } = req.params;
      const role = await Role.findOne({ where: { id } });
      return res.json(role);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async renameById(req, res, next) {
    try {
      const { id, roleName } = req.body;
      const role = await Role.update({ roleName }, { where: { id } });
      return res.json(role);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.body;
      const role = await Role.destroy({ where: { id } });
      return res.json(role);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
};
