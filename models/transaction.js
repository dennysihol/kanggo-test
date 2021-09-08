'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {foreignKey: "user_id"})
      Transaction.belongsTo(models.Product, {foreignKey: "product_id"})
      Transaction.hasOne(models.Payment, {foreignKey: "order_id"})
    }
  };
  Transaction.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  Transaction.addHook('beforeCreate', (trx, option) => {
    trx.status = "pending"
  })
  return Transaction;
};