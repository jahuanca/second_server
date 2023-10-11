'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Viaje extends Model {
    static associate(models) {

    }
  };
  Viaje.init({
    //add new parameters
    idtrazabilidad: {type: DataTypes.STRING, allowNull: true, },
    idetapa: {type: DataTypes.STRING, allowNull: true, },
    idfundo: {type: DataTypes.STRING, allowNull: true, },
    idcampo: {type: DataTypes.STRING, allowNull: true, },
    idturno: {type: DataTypes.STRING, allowNull: true, },
    idvariedad: {type: DataTypes.STRING, allowNull: true, },
    idtipoetiqueta: {type: DataTypes.STRING, allowNull: true, },
    idtipojaba: {type: DataTypes.STRING, allowNull: true, },
    idtipodocumento: {type: DataTypes.INTEGER, allowNull: true, },
    iddestino: {type: DataTypes.STRING, allowNull: true, },
    idviaje: {type: DataTypes.STRING, allowNull: true, },
    idproductor: {type: DataTypes.STRING, allowNull: true, },
    numerodocumento: {type: DataTypes.STRING, allowNull: true, },
    placavehiculo: {type: DataTypes.STRING, allowNull: true, },
    cantidadjabas: {type: DataTypes.INTEGER, allowNull: true, },
    fecharecepcion: {type: DataTypes.DATE, allowNull: true, },
    fechamod: {type: DataTypes.DATE, allowNull: true, },
    usuariomod: {type: DataTypes.STRING, allowNull: true, },
    guiaRm: {type: DataTypes.STRING, allowNull: true, },
    horaSmMovilidad: {type: DataTypes.STRING, allowNull: true, },
    horaSmCampo: {type: DataTypes.DATE, allowNull: true, },
    horaSmPacking: {type: DataTypes.DATE, allowNull: true, },
    estado: {type: DataTypes.STRING, allowNull: true, },
    idcultivo: {type: DataTypes.STRING, allowNull: true, },
    numeroAcopio: {type: DataTypes.STRING, allowNull: true, },
    productor: {type: DataTypes.STRING, allowNull: true, },
    usuariorecepcion: {type: DataTypes.STRING, allowNull: true, },
    idformato: {type: DataTypes.STRING, allowNull: true, },
    horaentrega: {type: DataTypes.STRING, allowNull: true, },
    lugardespacho: {type: DataTypes.STRING, allowNull: true, },
    lugarentrega: {type: DataTypes.STRING, allowNull: true, },
    lugarsalida: {type: DataTypes.STRING, allowNull: true, },
    descarga: {type: DataTypes.STRING, allowNull: true, },
    salidaPacking: {type: DataTypes.STRING, allowNull: true, },

    estado: {
      type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: { notEmpty: true, len: [1, 1], isIn: [['A', 'I', 'M']], isAlpha: true }
    },

    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now },
    updatedAt: { type: DataTypes.DATE, allowNull: true },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'Viaje',
    freezeTableName: true,
    tableName: 'Viaje'
  });
  return Viaje;
};