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
const statusRouter = require("./statusRouter");
const deliveryServiceRouter = require("./deliveryServiceRouter");

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
router.use("/status", statusRouter);
router.use("/delivery_service", deliveryServiceRouter);

module.exports = router;
