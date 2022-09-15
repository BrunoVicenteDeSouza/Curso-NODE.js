'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jogos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jogos.belongsTo(models.Consoles, { foreignKey: 'id' });
    }
  }
  Jogos.init({
    nome: DataTypes.STRING,
    preco: DataTypes.REAL,
    console_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jogos',
    freezeTableName: true,
  });
  return Jogos;
};