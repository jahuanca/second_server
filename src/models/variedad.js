'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variedad extends Model {
    static associate(models) {
      
    }
  };
  Variedad.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdVariedad: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    IdCultivo: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    VarietyAbrevia: {type: DataTypes.CHAR(10), allowNull: true},
    VarietyDenomina: {type: DataTypes.CHAR(20), allowNull: true},
    VarietySenasa: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Variedad',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_VARIEDAD',
    timestamps: false,
  });

  return Variedad;
};