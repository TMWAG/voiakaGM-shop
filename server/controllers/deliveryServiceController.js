const {DeliveryService} = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class DeliveryServiceController{
    static async create(req, res, next){
        try {
            const {deliveryServiceName} = req.body;
            const deliveryService = await DeliveryService.create({deliveryServiceName});
            return res.json(deliveryService);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getOneById(req, res, next){
        try {
            const {id} = req.params;
            const deliveryService = await DeliveryService.findOne({
                where: {id}, 
                attributes: {
                    exclude: [
                        "createdAt", 
                        "updatedAt"
                    ]
                }
            });
            return res.json(deliveryService);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAll(req, res, next){
        try {
            const deliveryServices = await DeliveryService.findAll({
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt"
                    ]
                }
            });
            return res.json(deliveryServices);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeNameById(req, res, next){
        try {
            const {id, deliveryServiceName} = req.body;
            const deliveryService = await DeliveryService.update(
                {deliveryServiceName},
                {where: {id}}
            );
            return res.json(deliveryService);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async deleteById(req, res, next){
        try {
            const {id} = req.body;
            const deliveryService = await DeliveryService.destroy({
                where: {id}
            });
            return res.json(deliveryService);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}