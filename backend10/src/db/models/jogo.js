'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jogo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jogo.belongsTo(models.Console, { foreignKey: 'console_id'});
    }
  }
  Jogo.init({
    nome: DataTypes.STRING,
    preco: DataTypes.REAL,
    console_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jogo',
  });
  return Jogo;
};