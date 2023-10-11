'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    static associate(models) {
      
    }
  };
  Etiqueta.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdEtiqueta: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    Btfield35Abrevia: {type: DataTypes.CHAR(10), allowNull: true},
    Btfield35Denomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Etiqueta',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_ETIQUETA',
    timestamps: false,
  });
  return Etiqueta;
};