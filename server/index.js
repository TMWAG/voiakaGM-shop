require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    // https://github.com/sequelize/sequelize/issues/9653?ysclid=l9d8gn56wq646581701#issuecomment-424305511
    //problem with mariadb/mysql generates
    //new Foreign Keys with every
    //restart, check link above with solution,
    //or if sequelize 7 stable was released, update it
    await sequelize.sync({ alter: false, force: false });
    app.listen(PORT, () => console.log(`server started on ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
};

start();
