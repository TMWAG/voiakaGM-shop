const { UserAddress } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class UserAddressController {
  static async create(req, res, next) {
    try {
      const { userId, address } = req.body;
      const userAddress = await UserAddress.create({ userId, address });
      return res.json(userAddress);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAllAddressesByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const address = await UserAddress.findAll({
        where: { userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return res.json(address);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changeAddressById(req, res, next) {
    try {
      const { id, address } = req.body;
      const newAddress = await UserAddress.update(
        { address },
        { where: { id } }
      );
      return res.json(newAddress);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.body;
      const address = await UserAddress.destroy({ where: { id } });
      return res.json(address);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
};
