const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");
const parameterRouter = require("./parameterRouter");
const vendorRouter = require("./vendorRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/parameter", parameterRouter);
router.use("/vendor", vendorRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
