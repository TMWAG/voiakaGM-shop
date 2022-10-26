const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class CategoryController {
  static async create(req, res, next) {
    try {
      const { categoryName } = req.body;
      const category = await Category.create({ categoryName });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "categoryName"],
      });
      return res.json(categories);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getOneById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        attributes: ["id", "categoryName"],
        where: { id },
      });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changeNameById(req, res, next) {
    try {
      const { id, categoryName } = req.body;
      const category = await Category.update(
        { categoryName },
        { where: { id } }
      );
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.body;
      const category = await Category.destroy({ where: { id } });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
};
