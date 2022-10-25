const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");
const parameterRouter = require("./parameterRouter");
const vendorRouter = require("./vendorRouter");

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/parameter", parameterRouter);
router.use("/vendor", vendorRouter);

module.exports = router;
