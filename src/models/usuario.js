'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      
    }
  };
  Usuario.init({
    //add new parameters
    
    //Mandt: {type: DataTypes.STRING(3), allowNull: true},
    Idusuario: {type: DataTypes.CHAR(4), allowNull: false, primaryKey: true},
    Idtipousu: {type: DataTypes.INTEGER, allowNull: true},
    Usuario: {type: DataTypes.STRING(20), allowNull: true},
    Detalleusuario: {type: DataTypes.STRING(300), allowNull: true},
    Clave: {type: DataTypes.STRING(20), allowNull: true},
    Activo: {type: DataTypes.CHAR(1), allowNull: true},
    Usermod: {type: DataTypes.STRING(20), allowNull: true},
    //Fechamod: {type: DataTypes.STRING, allowNull: true},


    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true,
    tableName: 'YWT_MOVIL_USUARIO',
    timestamps: false,
  });
  return Usuario;
};