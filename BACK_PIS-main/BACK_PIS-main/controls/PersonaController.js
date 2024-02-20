'use strict';
const { body, validationResult, check } = require('express-validator');
var models = require('../models/');
var persona = models.persona;
var rol = models.rol;
var cuenta = models.cuenta;
const bcypt = require('bcrypt');
const salRounds = 8;
//Importando la biblioteca nodemailer en tu archivo
const nodemailer = require("nodemailer");

class PersonaController {
    //LISTA TODO
    async listar(req, res) {
        var listar = await persona.findAll({
            attributes: ['apellidos', 'nombres', 'external_id', 'direccion', 'fecha_nacimiento', 'direccion', 'ocupacion', 'organizacion', 'rol'],
            include: {
                model: cuenta,
                as: 'cuenta',
                attributes: ['external_id', 'correo', 'estado']
            }
        });
        res.json({ msg: 'OK!', code: 200, info: listar });
    }
    //LISTA USUARIOS EN ESTADO DE ESPERA
    async listarEspera(req, res) {
        try {
            var listar = await persona.findAll({
                attributes: ['apellidos', 'nombres', 'external_id', 'direccion', 'fecha_nacimiento', 'direccion', 'ocupacion', 'organizacion', 'rol'],
                include: {
                    model: cuenta,
                    as: 'cuenta',
                    attributes: ['external_id', 'correo', 'estado']
                },
                where: {
                    '$cuenta.estado$': 'ESPERA',
                    rol: 'USUARIO'
                }
            });
    
            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar personas en espera:', error);
            res.status(500).json({ msg: 'Error interno del servidor', code: 500 });
        }
    }
    
    //LISTA USUARIOS EN ESTADO DE ACEPTADO
    async listarAceptado(req, res) {
        try {
            var listar = await persona.findAll({
                attributes: ['apellidos', 'nombres', 'external_id', 'direccion', 'fecha_nacimiento', 'direccion', 'ocupacion', 'organizacion', 'rol'],
                include: {
                    model: cuenta,
                    as: 'cuenta',
                    attributes: ['external_id', 'correo', 'estado']
                },
                where: {
                    '$cuenta.estado$': 'ACEPTADO',
                    rol: 'USUARIO'
                }
            });
    
            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar personas en espera:', error);
            res.status(500).json({ msg: 'Error interno del servidor', code: 500 });
        }
    }
    
    //METODO DE REGUSTRO DE USUARIOS
    async guardar(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({ msg: "DATOS FALTANTES", code: 400, errors: errors });
                return;
            }

            const claveHash = (clave) => bcypt.hashSync(clave, bcypt.genSaltSync(salRounds), null);

            const correoAux = req.body.correo;

            // Validar Datos duplicados en la Base de datos
            const correoExistente = await models.cuenta.findOne({ where: { correo: correoAux } });

            if (correoExistente) {
                res.json({ msg: "Correo ya existente", code: 500 });
                return;
          }

            const data = {
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                direccion: req.body.direccion,
                fecha_nacimiento: req.body.fecha_nacimiento,
                ocupacion: req.body.ocupacion,
                organizacion: req.body.organizacion,
                rol: "USUARIO",
                cuenta: { correo: req.body.correo, clave: claveHash(req.body.clave) }
            };

            console.log(data);

            let transaction = await models.sequelize.transaction();

            try {
                // Crear usuario en la base de datos
                await models.persona.create(data, {
                    include: [
                        { model: models.cuenta, as: "cuenta" },
                    ],
                    transaction
                });

                await transaction.commit();
                res.status(200).json({ msg: "USUARIO CREADO CON EXITO", code: 200 });
               
            } catch (error) {
                if (transaction) await transaction.rollback();
                const errorMsg = error.errors && error.errors[0] && error.errors[0].message
                    ? error.errors[0].message
                    : error.message;
                res.json({ msg: errorMsg, code: 200 });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno del servidor", code: 500 });
        }
    }


    //METODO DE REGISTRO DE ADMINISTRADOR
    async guardarAdmin(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({ msg: "DATOS FALTANTES", code: 400, errors: errors });
                return;
            }

            const claveHash = (clave) => bcypt.hashSync(clave, bcypt.genSaltSync(salRounds), null);

            const correoAux = req.body.correo;

            // Validar Datos duplicados en la Base de datos
            const correoExistente = await models.cuenta.findOne({ where: { correo: correoAux } });

            if (correoExistente) {
                res.json({ msg: "Correo ya existente", code: 500 });
                return;
          }

            const data = {
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                direccion: req.body.direccion,
                fecha_nacimiento: req.body.fecha_nacimiento,
                ocupacion: req.body.ocupacion,
                organizacion: req.body.organizacion,
                rol: "ADMINISTRADOR",
                cuenta: { correo: req.body.correo, clave: claveHash(req.body.clave), estado: "ACEPTADO" }
            };

            console.log(data);

            let transaction = await models.sequelize.transaction();

            try {
                // Crear usuario en la base de datos
                await models.persona.create(data, {
                    include: [
                        { model: models.cuenta, as: "cuenta" },
                    ],
                    transaction
                });

                await transaction.commit();
                res.status(200).json({ msg: "USUARIO CREADO CON EXITO", code: 200 });
               
            } catch (error) {
                if (transaction) await transaction.rollback();
                const errorMsg = error.errors && error.errors[0] && error.errors[0].message
                    ? error.errors[0].message
                    : error.message;
                res.json({ msg: errorMsg, code: 200 });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno del servidor", code: 500 });
        }
    }
}
module.exports = PersonaController;