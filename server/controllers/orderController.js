const {Order} = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class OrderController{
    static async create(req, res, next){
        try {
	        const userId = req.user.id;
            const order = await Order.create({
                statusId: process.env.ORDER_NOT_APPROVED,
                userId
            });
	        return res.json(order);
        } catch (error) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAll(req, res, next){
        try {
            const orders = await Order.findAll();
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByUserId(req, res, next){
        try {
            const {userId} = req.params;
            if(!(userId == req.user.id) || !(req.user.roleId >= process.env.MODERATOR_ROLE_ID)){
                return next(ApiError.forbidden("Просматривать заказы может только сам пользователь или администрация"))
            }
            const userOrders = await Order.findAll({
                where:{userId}
            })
            return res.json(userOrders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByStatusId(req, res, next){
        try {
            const {statusId} = req.params;
            const orders = await Order.findAll({
                where: {statusId}
            });
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByDeliveryServiceId(req, res, next){
        try {
            const {deliveryServiceId} = req.params;
            const orders = await Order.findAll({
                where: {deliveryServiceId}
            });
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getCurrentOrderByUserId(req, res, next){
        try {
            const userId = req.user.id;
            const order = await Order.findOne({
                where: {
                    userId, 
                    statusId: process.env.ORDER_NOT_APPROVED
                }
            });
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async addTrackNoById(req, res, next){
        try {
            const {id, trackNo} = req.body;
            const order = await Order.update(
                {trackNo},
                {where: {id}}
            );
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async addUserAddressById(req, res, next){
        try {
            const {userAddressId, id} = req.body;
            const order = await Order.update(
                {userAddressId},
                {where: {id}}
            )
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeStatusToApprovedById(req, res, next){
        try {
            const {id} = req.body;
            const order = await Order.update(
                {statusId: process.env.ORDER_APPROVED},
                {where: {id}}
            );
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    static async changeStatusToPaidById(req, res, next){
        try {
            const {id} = req.body;
            const order = await Order.update(
                {statusId: process.env.ORDER_PAID},
                {where: {id}}
            );
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeStatusToCompletedById(req, res, next){
        try {
            const {id} = req.body;
            const order = await Order.update(
                {statusId: process.env.ORDER_COMPLETED},
                {where: {id}}
            );
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeStatusToSentForDeliveryById(req, res, next){
        try {
            const {id} = req.body;
            const order = await Order.update(
                {statusId: process.env.ORDER_SENT_FOR_DELIVERY},
                {where: {id}}
            );
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeStatusToDeliveredById(req, res, next){
        try {
            const {id} = req.body;
            const order = await Order.update(
                {statusId: process.env.ORDER_DELIVERED},
                {where: {id}}
            );
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async deleteById(req, res, next){
        try {
            const {id} = req.body;
            const order = await Order.destroy({where: {id}});
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}