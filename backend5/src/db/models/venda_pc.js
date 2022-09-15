'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venda_PC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Venda.hasMany(models.Venda_PC, { foreignKey: 'venda_id' });
      Venda_PC.belongsTo(models.Venda, { foreignKey: 'venda_id' });
      models.PC.hasMany(Venda_PC, { foreignKey: 'pc_id' });
      Venda_PC.belongsTo(models.PC, {foreignKey: 'pc_id' });
    }
  }
  Venda_PC.init({
    pc_id: DataTypes.INTEGER,
    venda_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Venda_PC',
  });
  return Venda_PC;
};