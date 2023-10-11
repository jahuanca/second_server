'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etapa extends Model {
    static associate(models) {
      
    }
  };
  Etapa.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    IdEtapa: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    StageAbrevia: {type: DataTypes.CHAR(10), allowNull: true},
    StageDenomina: {type: DataTypes.CHAR(20), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Etapa',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_ETAPA',
    timestamps: false,
  });
  return Etapa;
};