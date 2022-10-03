'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Console extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Console.hasMany(models.Jogo, { foreignKey: 'console_id' });
    }
  }
  Console.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Console',
  });
  return Console;
};