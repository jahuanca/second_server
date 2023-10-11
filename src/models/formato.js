'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formato extends Model {
    static associate(models) {
      
    }
  };
  Formato.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    Idtipoformato: {type: DataTypes.CHAR(10), allowNull: true, primaryKey: true},
    Idtipoetiq: {type: DataTypes.CHAR(4), allowNull: true},
    Btfield35Abrevia: {type: DataTypes.CHAR(10), allowNull: true},
    Btfield35Denomina: {type: DataTypes.CHAR(20), allowNull: true},
    Idformato: {type: DataTypes.CHAR(4), allowNull: true},
    Btfield34Denomina: {type: DataTypes.CHAR(20), allowNull: true},
    Btfield34Abrevia: {type: DataTypes.CHAR(10), allowNull: true},
    Idtipojaba: {type: DataTypes.CHAR(5), allowNull: true},
    TipojabaDenomina: {type: DataTypes.CHAR(35), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Formato',
    freezeTableName: true,
    tableName: 'YWTGW_GET_TIPOFORMATO',
    timestamps: false,
  });
  return Formato;
};