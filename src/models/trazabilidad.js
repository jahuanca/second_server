'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trazabilidad extends Model {
    static associate(models) {

    }
  };
  Trazabilidad.init({
    //add new parameters

    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    //Langu: {type: DataTypes.CHAR(1), allowNull: true},
    Aufex: { type: DataTypes.CHAR(20), allowNull: true, primaryKey: true},
    IdEtapa: { type: DataTypes.CHAR(4), allowNull: false,},
    StageDenomina: { type: DataTypes.CHAR(20), allowNull: true },
    IdCampo: { type: DataTypes.CHAR(4), allowNull: true },
    LandDenomina: { type: DataTypes.CHAR(20), allowNull: true },
    IdTurno: { type: DataTypes.CHAR(4), allowNull: true },
    ShiftDenomina: { type: DataTypes.CHAR(20), allowNull: true },
    IdVariedad: { type: DataTypes.CHAR(4), allowNull: true },
    VarietyDenomina: { type: DataTypes.CHAR(20), allowNull: true },
    IdCultivo: { type: DataTypes.CHAR(4), allowNull: true },
    Field01Denomina: { type: DataTypes.CHAR(20), allowNull: true },
    IdFundo: { type: DataTypes.CHAR(4), allowNull: true },
    AllotmentDenomina: { type: DataTypes.CHAR(20), allowNull: true },
    IdProductor: { type: DataTypes.CHAR(10), allowNull: true },
    Name1: { type: DataTypes.CHAR(35), allowNull: true },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'Trazabilidad',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_TRAZABILIDAD',
    timestamps: false,
  });
  return Trazabilidad;
};