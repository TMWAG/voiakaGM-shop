const {OrderedProduct} = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class OrderedProductController{
    static async create(req, res, next){
        try {
            const {orderId, productId, amount} = req.body;
            const orderedProduct = await OrderedProduct.create({orderId, productId, amount});
            return res.json(orderedProduct);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByOrderId(req, res, next){
        try {
            const {orderId} = req.params;
            const orderedProducts = await OrderedProduct.findAll({
                where: {orderId},
                attributes:{
                    exclude: ["updatedAt"]
                }
            });
            return res.json(orderedProducts);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeAmountById(req, res, next){
        try {
            const {id, amount} = req.body;
            const orderedProduct = await OrderedProduct.update({amount}, {where: {id}}); 
            return res.json(orderedProduct);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async deleteById(req, res, next){
        try {
            const {id} = req.body;
            const orderedProduct = await OrderedProduct.destroy({where: {id}});
            return res.json(orderedProduct);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}