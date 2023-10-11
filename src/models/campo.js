'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campo extends Model {
    static associate(models) {
      
    }
  };
  Campo.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdCampo: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    LandAbrevia: {type: DataTypes.CHAR(10), allowNull: true},
    LandDenomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Campo',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_CAMPO',
    timestamps: false,
  });
  return Campo;
};