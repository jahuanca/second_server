'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destino extends Model {
    static associate(models) {
      
    }
  };
  Destino.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdDestino: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    Btfield49Abrevia: {type: DataTypes.CHAR(10), allowNull: true},
    Btfield49Denomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Destino',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_DESTINO',
    timestamps: false,
  });
  return Destino;
};