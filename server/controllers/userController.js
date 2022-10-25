const { User } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const inputValidation = require("../utility/inputValidation");
const { where } = require("sequelize");

const generateJwt = (id, email, roleId) => {
  return jwt.sign({ id: id, email, roleId }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

module.exports = class UserController {
  static async registration(req, res, next) {
    try {
      const {login, name, surname, phone, email, password } = req.body;
      if (
        !inputValidation.checkLogin(login) ||
        !inputValidation.checkFullName(name, surname) ||
        !inputValidation.checkEmail(email) ||
        !inputValidation.checkPhone(phone) ||
        !inputValidation.checkPassword(password)
      ) {
        return next(ApiError.badRequest("Введённые данные не удовлетворяют требованиям"));
      }
      if(await User.findOne({where: {login}})){
        return next(ApiError.badRequest("Данный логин занят"));
      }
      if(await User.findOne({where: {phone}})){
        return next(ApiError.badRequest("Пользователь с таким номером уже зарегистрирован"))
      }
      if(await User.findOne({where: {email}})){
        return next(ApiError.badRequest("Пользователь с таким Email уже зарегистрирован"));
      }
      const hashPassword = await bcrypt.hash(password, 6);
      const user = await User.create({
        login,
        name,
        surname,
        phone,
        email,
        password: hashPassword,
        roleId: process.env.DEFAULT_USER_ROLE_ID
      });
      const token = generateJwt(user.id, user.login, user.roleId);
      return res.json({token});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async login(req, res, next){
    try {
      const {login, password} = req.body;
      if(!inputValidation.checkLogin(login) || !inputValidation.checkPassword(password)){
        return next(ApiError.badRequest("Введены некорректные данные"));
      }
      const user = await User.findOne({where: {login}});
      if(!user){
        return next(ApiError.badRequest("Пользователь с таким логином не найден"));
      }
      if(await bcrypt.compare(password, user.password)){
        return next(ApiError.badRequest("Введён неверный пароль"));
      }
      const token = generateJwt(user.id, user.login, user.roleId);
      return res.json({token});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getOneById(req, res, next){
    try {
      const {id} = req.params;
      const user = await User.findOne({where: {id}, attributes: ["id", "name", "surname", "vkLink", "tgLink", "createdAt"]});
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  static async getAllByRoleId(req, res, next){
    try {
      const {roleId} = req.params;
      const users = await User.findAll({attributes: ["id", "name", "surname", "vkLink", "tgLink", "roleId", "createdAt"]}, {where: {roleId}});
      return res.json(users)
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAll(req, res, next){
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  static async addTGLinkById(req, res, next){
    try {
      const {tgLink, id} = req.body;
      if(!inputValidation.checkTgLink(tgLink)){
        return next(ApiError.badRequest("Указано неверное имя пользователя Telegram"));
      }
      if(await User.findOne({where: {tgLink}})){
        return next(ApiError.badRequest("Данное имя пользователя telegram привязано к другому аккаунту"));
      }
      const user = await User.update({tgLink}, {where: {id}});
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async addVKLinkById(req, res, next){
    try {
      const {vkLink, id} = req.body;
      if(!inputValidation.checkVKLink(vkLink)){
        return next(ApiError.badRequest("Указана недействительная ссылка на ВК"));
      }
      if(await User.findOne({where:{vkLink}})){
        return next(ApiError.badRequest("Этот аккаунт ВК уже привязан к другому аккаунту"));
      }
      const user = await User.update({vkLink}, {where: {id}});
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changePhoneById(req, res, next){
    try {
      const {id, phone} = req.body;
      if(!inputValidation.checkPhone(phone)){
        return next(ApiError.badRequest("Указан неправильный номер телефона"));
      }
      if(await User.findOne({where: {phone}})){
        return next(ApiError.badRequest("Данный номер телефона привязан к другому аккаунту"));
      }
      const user = await User.update({phone}, {where: {id}});
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changePasswordById(req, res, next){
    try {
      const {newPassword, id} = req.body;
      if(!inputValidation.checkPassword(newPassword)){
        return next(ApiError.badRequest("Введённый пароль не соответствует требованиям"));
      }
      const user = await User.findOne({where: {id}});
      if(await bcrypt.compare(newPassword, user.password)){
        return next(ApiError.badRequest("Новый пароль должен отличаться от старого"));
      }
      const password = await bcrypt.hash(newPassword, 6);
      return res.json(await User.update({password}, {where: {id}}));
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async changeRoleIdById(req, res, next){
    try {
      const {id, roleId} = req.body;
      const user = await User.update({roleId}, {where: {id}});
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
  static async deleteTGLinkById(req, res, next){
    try {
      const {id} = req.body;
      const user = await User.update({tgLink: null}, {where: {id}});
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteVKLinkById(req, res, next){
    try {
      const {id} = req.body;
      const user = await User.update({vkLink: null}, {where: {id}});
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next){
    try {
      const {id} = req.body;
      const user = await User.destroy({where: {id}});
      return res.json(user);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
};
