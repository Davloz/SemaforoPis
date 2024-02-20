'use strict';
const { UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const persona = sequelize.define('persona', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
        nombres: { type: DataTypes.STRING(50), defaultValue: "NO_DATA" },
        apellidos: { type: DataTypes.STRING(50), defaultValue: "NO_DATA" },
        fecha_nacimiento: { type: DataTypes.DATE},
        direccion: {type: DataTypes.STRING(255), defaultValue: "NO_DATA"},
        ocupacion: {type: DataTypes.STRING(50), defaultValue: "NO_DATA"},
        organizacion: {type: DataTypes.STRING(100), defaultValue: "NO_DATA"},
        rol: {type: DataTypes.ENUM("ADMINISTRADOR","USUARIO"), defaultValue: "USUARIO"}
    }, {
        freezeTableName: true
    });
    persona.associate = function (models){
        persona.hasOne(models.cuenta, { foreignKey: 'id_persona', as: 'cuenta'});
    }
    return persona;
};