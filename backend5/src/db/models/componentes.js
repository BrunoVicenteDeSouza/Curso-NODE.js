'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Componentes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Componentes.belongsTo(models.PC, { foreignKey: 'pc_id' });
    }
  }
  Componentes.init({
    descricao: DataTypes.STRING,
    capacidade: DataTypes.STRING,
    pc_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Componentes',
  });
  return Componentes;
};