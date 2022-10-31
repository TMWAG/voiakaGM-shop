const {Feedback} = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = class FeedbackController{
    static async create(req, res, next){
        try {
            const {userId, productId, feedbackText, feedbackRating} = req.body;
            const feedback = await Feedback.create({userId, productId, feedbackText, feedbackRating});
            return res.json(feedback);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByUserId(req, res, next){
        try {
            const {userId} = req.params;
            const feedbacks = await Feedback.findAll({where: {userId}});
            return res.json(feedbacks);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async getAllByProductId(req, res, next){
        try {
            const {productId} = req.params;
            const feedbacks = await Feedback.findAll({where: {productId}});
            return res.json(feedbacks);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeTextById(req, res, next){
        try {
            const {id, feedbackText} = req.body;
            const feedback = await Feedback.update({feedbackText}, {where: {id}});
            return res.json(feedback);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async changeRatingById(req, res, next){
        try {
            const {id, feedbackRating} = req.body;
            const feedback = await Feedback.update({feedbackRating}, {where: {id}});
            return res.json(feedback);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async deleteById(req, res, next){
        try {
            const {id} = req.body;
            const feedback = await Feedback.destroy({where: {id}});
            return res.json(feedback);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}