'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Computador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Computador.init({
    nome: DataTypes.STRING,
    preco: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Computador',
  });
  return Computador;
};