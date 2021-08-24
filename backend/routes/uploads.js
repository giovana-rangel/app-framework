const { Router } = require('express');
const { check } = require('express-validator');
const multipart = require('connect-multiparty');
const { validarCampos } = require('../middlewares/index');
const { cargarImagen, getImagen } = require('../controllers/uploads.js');

const router = Router();

//genera un middleware que permite cargar y guardar archivos en la ruta especificada
const md_upload = multipart({uploadDir: './upload/articles'});

router.post('/:id', md_upload,[
  check('id','El id debe ser de Mongo').isMongoId(),
  validarCampos
], cargarImagen );

router.get('/get/:image', getImagen);

module.exports = router;