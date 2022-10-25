const {Vendor} = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class VendorController{
    static async create(req, res, next){
        try {
            const {vendorName} = req.body;
            const vendor = await Vendor.create({vendorName});
            return res.json(vendor);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAll(req, res, next){
        try {
            const vendors = await Vendor.findAll();
            return res.json(vendors);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getOneById(req, res, next){
        try {
            const {id} = req.params;
            const vendor = await Vendor.findOne({attributes: ["id", "vendorName"], where: {id}});
            return res.json(vendor);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeNameById(req, res, next){
        try {
            const {id, vendorName} = req.body;
            const vendor = await Vendor.update({vendorName}, {where: {id}});
            return res.json(vendor);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async deleteById(req, res, next){
        try {
            const {id} = req.body;
            const vendor = await Vendor.destroy({where: {id}});
            return res.json(vendor);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}