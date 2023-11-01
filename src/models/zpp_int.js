'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zpp_Int extends Model {
    static associate(models) {
      Zpp_Int.belongsTo(models.Conclusion, {foreignKey: 'idConclusion'})
    }
  };
  Zpp_Int.init({
    IDFUNDO: {type: DataTypes.STRING(4), allowNull: true},
    IDETAPA: {type: DataTypes.STRING(4), allowNull: true},
    IDCAMPO: {type: DataTypes.STRING(4), allowNull: true},
    IDTURNO: {type: DataTypes.STRING(4), allowNull: true},
    IDCULTIVO: {type: DataTypes.STRING(4), allowNull: true},
    IDVARIEDAD: {type: DataTypes.STRING(4), allowNull: true},
    IDTIPOETIQ: {type: DataTypes.STRING(4), allowNull: true},
    IDTIPOJABA: {type: DataTypes.STRING(5), allowNull: true},
    IDFORMATO: {type: DataTypes.STRING(5), allowNull: true},
    YWT_BTFIELD34: {type: DataTypes.STRING(5), allowNull: true},
    IDTIPODOCU: {type: DataTypes.STRING(4), allowNull: true},
    IDDESTINO: {type: DataTypes.STRING(4), allowNull: true},
    IDVIAJE: {type: DataTypes.INTEGER, allowNull: true},
    idConclusion: {type: DataTypes.INTEGER, allowNull: true},
    IDTRAZABILIDAD: {type: DataTypes.STRING(200), allowNull: true},
    PRODUCTOR: {type: DataTypes.STRING(200), allowNull: true},
    NUMERODOCUMENTO: {type: DataTypes.STRING(200), allowNull: true},
    PLACAVEHICULO: {type: DataTypes.STRING(200), allowNull: true},
    CANTIDADJABAS: {type: DataTypes.INTEGER, allowNull: true},
    NUMEROACOPIO: {type: DataTypes.STRING(200), allowNull: true},
    ID_STATUS: {type: DataTypes.INTEGER, allowNull: true},
    GUIA_RM: {type: DataTypes.STRING(200), allowNull: true},
    FECHARECEPCION: {type: DataTypes.STRING(200), allowNull: true},
    HORA_SM_CAMPO: {type: DataTypes.STRING(200), allowNull: true},
    HORA_SM_PACKING: {type: DataTypes.STRING(200), allowNull: true},
    ESTADO: {type: DataTypes.STRING(200), allowNull: true},
    FECHAMOD: {type: DataTypes.STRING(200), allowNull: true},
    USUARIOMOD: {type: DataTypes.INTEGER, allowNull: true},
    USUARIORECEPCION: {type: DataTypes.INTEGER, allowNull: true},
    YWT_BTFIELD67: {type: DataTypes.STRING(200), allowNull: true},
    LUGARENTREGA: {type: DataTypes.STRING(200), allowNull: true},
    HORAENTREGA: {type: DataTypes.STRING(200), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Zpp_Int',
    freezeTableName: true,
    timestamps: false,
    tableName: 'GET_ZPP_INT'
  });
  return Zpp_Int;
};