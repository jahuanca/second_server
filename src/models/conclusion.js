'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Conclusion extends Model {
        static associate(models) {

        }
    };
    Conclusion.init({
        //add new parameters
        IDVIAJE: { type: DataTypes.INTEGER, allowNull: true },
        CODVIAJE: { type: DataTypes.INTEGER, allowNull: true },
        ESTADO: { type: DataTypes.STRING, allowNull: true },
        PLACAVEHICULO: { type: DataTypes.STRING, allowNull: true },
        FECHA: { type: DataTypes.STRING, allowNull: true },
        FECHACREACION: { type: DataTypes.STRING, allowNull: true },
        FECHAVALIDA: { type: DataTypes.STRING, allowNull: true },
        IDUSUCREA: { type: DataTypes.STRING, allowNull: true },
        IDUSUVALI: { type: DataTypes.STRING, allowNull: true },
        HORALLEGADA: { type: DataTypes.STRING, allowNull: true },
        HORADESPACHO: { type: DataTypes.STRING, allowNull: true },
        HORASALIDA: { type: DataTypes.STRING, allowNull: true },
        LUGARLLEGADA: { type: DataTypes.STRING, allowNull: true },
        LUGARDESPACHO: { type: DataTypes.STRING, allowNull: true },
        LUGARSALIDA: { type: DataTypes.STRING, allowNull: true },

        accion: { type: DataTypes.VIRTUAL },
        usuario: { type: DataTypes.VIRTUAL },
        ip: { type: DataTypes.VIRTUAL },
        accion_usuario: { type: DataTypes.VIRTUAL }
    }, {
        sequelize,
        modelName: 'Conclusion',
        freezeTableName: true,
        tableName: 'Conclusion',
        timestamps: false,
    });
    return Conclusion;
};