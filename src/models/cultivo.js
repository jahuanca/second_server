'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cultivo extends Model {
    static associate(models) {
      
    }
  };
  Cultivo.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdCultivo: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    Field01Abrevia: {type: DataTypes.CHAR(10), allowNull: true},
    Field01Denomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Cultivo',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_CULTIVO',
    timestamps: false,
  });
  return Cultivo;
};