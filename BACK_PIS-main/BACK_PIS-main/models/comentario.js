'use strict';
const { UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const comentario = sequelize.define('comentario', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
        coment: { type: DataTypes.STRING(200), allowNull: false },
        sentimiento: { type: DataTypes.STRING(50), allowNull: false },
        usuario: { type: DataTypes.STRING(50), allowNull: false },
    }, 
    {
        freezeTableName: true
    });
    return comentario;
};