const {Product} = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class ProductController{
    static async create(req, res, next){
        try {
            const {productName, vendorId, categoryId, price, amount, discount, description} = req.body;
            const product = await Product.create({productName, vendorId, categoryId, price, amount, discount, description});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAll(req, res, next){
        try {
            let {limit , page} = req.query;
            page = Number(page || 1);
            limit = Number(limit || 12);
            let offset = page * limit - limit;
            const product = await Product.findAndCountAll({
                limit, 
                offset, 
                attributes: ["id", "productName", "price", "amount", "discount", "description", "vendorId", "categoryId"]
            });
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getOneById(req, res, next){
        try {
            const {id} = req.params;
            const product = await Product.findOne({where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByVendorId(req, res, next){
        try {
            const {vendorId} = req.params;
            let {limit, page} = req.query;
            page = Number(page || 1);
            limit = Number(limit || 12);
            let offset = page * limit - limit;
            const products = await Product.findAndCountAll({where: {vendorId}, limit, offset, attributes: {exclude: ["createdAt", "updatedAt"]}});
            return res.json(products);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByCategoryId(req, res, next){
        try {
            const {categoryId} = req.params;
            let {limit, page} = req.query;
            page = page || 1;
            limit = limit || 12;
            let offset = page * limit - limit;
            const products = await Product.findAndCountAll({where: {categoryId}, limit, offset, attributes: {exclude: ["createdAt", "updatedAt"]}});
            return res.json(products);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeVendorById(req, res, next){
        try {
            const {id, vendorId} = req.body;
            const product = await Product.update({vendorId}, {where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeCategoryById(req, res, next){
        try {
            const {id, categoryId} = req.body;
            const product = await Product.update({categoryId}, {where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changePriceById(req, res, next){
        try {
            const {id, price} = req.body;
            const product = await Product.update({price}, {where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeAmountById(req, res, next){
        try {
            const {id, amount} = req.body;
            const product = await Product.update({amount}, {where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeDiscountById(req, res, next){
        try {
            const {id, discount} = req.body;
            const product = await Product.update({discount}, {where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeDescriptionById(req, res, next){
        try {
            const {id, description} = req.body;
            const product = await Product.update({description}, {where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async deleteById(req, res, next){
        try {
            const {id} = req.body;
            const product = await Product.destroy({where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}