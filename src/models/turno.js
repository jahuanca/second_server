'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {
      
    }
  };
  Turno.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdTurno: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    ShiftAbrevia: {type: DataTypes.CHAR(10), allowNull: true},
    ShiftDenomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Turno',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_TURNO',
    timestamps: false,
  });
  return Turno;
};