'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jaba extends Model {
    static associate(models) {
      
    }
  };
  Jaba.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdJaba: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    Btfield34Abrevia: {type: DataTypes.CHAR(10), allowNull: true},
    Btfield34Denomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Jaba',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_TIPOJABA',
    timestamps: false,
  });
  return Jaba;
};