'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fundo extends Model {
    static associate(models) {
      
    }
  };
  Fundo.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdFundo: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    AllotmentAbrevia: {type: DataTypes.CHAR(10), allowNull: true},
    AllotmentDenomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Fundo',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_FUNDO',
    timestamps: false,
  });
  return Fundo;
};