const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");
const parameterRouter = require("./parameterRouter");
const vendorRouter = require("./vendorRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const productPictureRouter = require("./productPictureRouter");
const characteristicRouter = require("./characteristicRouter");
const userAddressRouter = require("./userAddressRouter");
const feedbackRouter = require("./feedbackRouter");

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/parameter", parameterRouter);
router.use("/vendor", vendorRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/picture", productPictureRouter);
router.use("/characteristic", characteristicRouter);
router.use("/user_address", userAddressRouter);
router.use("/feedback", feedbackRouter);

module.exports = router;
