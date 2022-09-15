'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Monitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Monitor.init({
    nome: DataTypes.STRING,
    preco: DataTypes.REAL,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Monitor',
  });
  return Monitor;
};