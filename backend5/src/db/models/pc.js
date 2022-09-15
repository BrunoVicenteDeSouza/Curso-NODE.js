'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PC.hasMany(models.Componentes, { foreignKey: 'pc_id'}),
      PC.belongsToMany(models.Venda, {
        through: 'Venda_PC',
        foreignKey: 'pc_id',
      });
    }
  }
  PC.init({
    descricao: DataTypes.STRING,
    preco: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'PC',
  });
  return PC;
};