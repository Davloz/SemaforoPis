var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const PersonaController = require('../controls/PersonaController');
var personaController =new PersonaController();
const CuentaController = require('../controls/CuentaController');
var cuentaController =new CuentaController();
const ComentarioController = require('../controls/ComentarioController');
var comentarioController =new ComentarioController();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var auth = function middleware(req, res, next) {
  const token = req.headers['x-api-token'];
  if (token) {
    require('dotenv').config();
    const llave = process.env.KEY;
    
    jwt.verify(token, llave, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({
          msg: "TOKEN NO VALIDO",
          code: 401
        });
      } else {
        var models = require('../models');
        var cuenta = models.cuenta;
        req.decoded = decoded;
        let aux = await cuenta.findOne({ where: { external_id: req.decoded.external } })
        if (aux === null) {
          res.status(401);
          res.json({
            msg: "TOKEN NO VALIDO O EXPIRADO",
            code: 401
          });
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401);
    res.json({
      msg: "NO EXISTE TOKEN",
      code: 401
    });
  }

}
//------------CUENTA-----------
router.post('/inicio', [
  body('correo', 'Ingrese un correo').trim().exists().not().isEmpty().isEmail(),
  body('clave', 'Ingrese una clave').trim().exists().not().isEmpty(),
], cuentaController.sesion);
router.post('/cuenta/modEstado', cuentaController.modificar_estado);
router.get('/cuenta/get:external_id', cuentaController.obtener);

//------------PERSONA------------
router.post('/persona/save', [
  body('apellidos', 'Ingrese sus apellidos').trim().exists().not().isEmpty().isLength({ min: 3, max: 50 }).withMessage("Ingrese un valor mayor o igual a 3 y menor a 50"),
  body('nombres', 'Ingrese sus nombres').trim().exists().not().isEmpty().isLength({ min: 3, max: 50 }).withMessage("Ingrese un valor mayor o igual a 3 y menor a 50"),
], personaController.guardar);
router.post('/administrador/save', [
  body('apellidos', 'Ingrese sus apellidos').trim().exists().not().isEmpty().isLength({ min: 3, max: 50 }).withMessage("Ingrese un valor mayor o igual a 3 y menor a 50"),
  body('nombres', 'Ingrese sus nombres').trim().exists().not().isEmpty().isLength({ min: 3, max: 50 }).withMessage("Ingrese un valor mayor o igual a 3 y menor a 50"),
], personaController.guardarAdmin);
router.get('/persona/list', personaController.listar);
router.get('/persona/listaEspera', personaController.listarEspera);
router.get('/persona/listaAceptado', personaController.listarAceptado);
//------------COMENTARIO------------
router.post('/comentario/save', [
  body('comentario', 'Ingrese un comentario').trim().exists().not().isEmpty().isLength({ min: 3, max: 200 }).withMessage("Ingrese un valor mayor o igual a 3 y menor a 200"),
], comentarioController.guardar);
router.get('/comentario/list', comentarioController.listar);
module.exports = router;