const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  vkLink: { type: DataTypes.STRING, allowNull: true, unique: true },
  tgLink: { type: DataTypes.STRING, allowNull: true, unique: true },
});

const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  roleName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const AccessLevel = sequelize.define("accessLevel", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  accessLevelName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const UserAddress = sequelize.define("user_address", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  address: { type: DataTypes.STRING, allowNull: false },
});

const Feedback = sequelize.define("feedback", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  feedbackText: { type: DataTypes.TEXT, allowNull: true },
  feedbackRating: { type: DataTypes.INTEGER, allowNull: false },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  discount: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: false },
});

const Vendor = sequelize.define("vendor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  categoryName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Characteristic = sequelize.define("characteristic", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, allowNull: false },
});

const Parameter = sequelize.define("parameter", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  parameterName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Picture = sequelize.define("picture", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  path: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  trackNo: { type: DataTypes.STRING, allowNull: true, unique: true },
});

const Status = sequelize.define("status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  statusName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const DeliveryService = sequelize.define("delivery_service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deliveryServiceName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const OrderedProduct = sequelize.define("ordered_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.INTEGER, allowNull: false },
});

//user's connections
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Feedback);
Feedback.belongsTo(User);
User.hasMany(UserAddress);
UserAddress.belongsTo(User);

//role's connections
Role.hasMany(User);
User.belongsTo(Role);

//access level's connections
AccessLevel.hasMany(Role);
Role.belongsTo(AccessLevel);

//product's connections
Product.hasMany(Feedback);
Feedback.belongsTo(Product);
Product.hasMany(OrderedProduct);
OrderedProduct.belongsTo(Product);
Product.hasMany(Picture);
Picture.belongsTo(Product);
Product.hasMany(Characteristic);
Characteristic.belongsTo(Product);

//parameter's connections
Parameter.hasMany(Characteristic);
Characteristic.belongsTo(Parameter);

//vendor's connections
Vendor.hasMany(Product);
Product.belongsTo(Vendor);

//category's connections
Category.hasMany(Product);
Product.belongsTo(Category);

//order's connections
Order.hasMany(OrderedProduct);
OrderedProduct.belongsTo(Order);

//user addresses connections
UserAddress.hasMany(Order);
Order.belongsTo(UserAddress);

//statuses connections
Status.hasMany(Order);
Order.belongsTo(Status);

//delivery services connections
DeliveryService.hasMany(Order);
Order.belongsTo(DeliveryService);

module.exports = {
  User,
  Role,
  AccessLevel,
  UserAddress,
  Feedback,
  Product,
  Vendor,
  Category,
  Characteristic,
  Parameter,
  Picture,
  Order,
  Status,
  DeliveryService,
  OrderedProduct,
};
