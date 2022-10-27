const { Picture } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const staticFolderPath = path.resolve(__dirname, "..", "static", "products")

module.exports = class ProductPictureController {
  static async addToProductById(req, res, next) {
    try {
      const { productId } = req.body;
      const { img } = req.files;
      let filename = uuid.v4() + ".jpg";
      let folderPath = path.resolve(
        staticFolderPath,
        `${productId}`
      );
      if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, (e) => {
          if (e) {
            next(ApiError.internal(e.message));
          }
        });
      }
      img.mv(
        path.resolve(
          staticFolderPath,
          `${productId}`,
          filename
        )
      );
      const image = await Picture.create({ path: filename, productId });
      return res.json(image);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async getAllByProductId(req, res, next) {
    try {
      const { productId } = req.params;
      const images = await Picture.findAll({
        where: { productId },
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      return res.json(images);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.body;
      const picture  = await Picture.findOne({ where: { id } });
      fs.unlink(
        path.resolve(staticFolderPath, `${picture.productId}`, picture.path), 
        (e) => {
          next(ApiError.internal(e.message));
        }
      );
      const img = Picture.destroy({ where: { id } });
      return res.json(img);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async deleteAllByProductId(req, res, next){
    try {
      const {productId} = req.body;
      fs.rm(
        path.resolve(staticFolderPath, `${productId}`),
        {
          force: true,
          recursive: true
        },
        (e) =>{
          if(e){
            next(ApiError.internal(e.message));
          }
        }
      );
      const pictures = await Picture.destroy({where: {productId}});
      return res.json(pictures);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
};
