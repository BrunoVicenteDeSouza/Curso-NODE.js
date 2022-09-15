'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consoles.hasMany(models.Jogos, { foreignKey: 'console_id' });
    }
  }
  Consoles.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Consoles',
    freezeTableName: true,
  });
  return Consoles;
};