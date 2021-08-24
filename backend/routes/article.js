const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/index');
const { existeArticlePorId } = require('../helpers/db-validators');
const { getArticles,
        getArticle ,
        saveArticle, 
        update,
        deleteArticle, 
        search
} = require('../controllers/article');

const router = Router();

//=========== GET ALL ============
router.get('/articles/:last', getArticles);

//============= GET ==============

router.get('/article/:id',[
  check('id', 'Un id Mongo válido es obligatorio').isMongoId(),
  check('id').custom( existeArticlePorId ),
  validarCampos
], getArticle);

//========= GET SEARCH  ==========

router.get('/search/:searchKey', search);

//============ POST ==============
router.post('/save', [
  check('title', 'el título es obligatorio').not().isEmpty(),
  check('content', 'el contenido es obligatorio').not().isEmpty(),
  validarCampos,
], saveArticle);

//============= POST ==============
// router.post('/upload-image/:id', validarFile , cargarArchivo );

//============= PUT ==============
router.put('/:id', [
  check('id', 'Un id Mongo válido es obligatorio').isMongoId(),
  check('id').custom( existeArticlePorId ),
  validarCampos
], update);

//============ DELETE ============
router.delete('/:id',[
  check('id', 'Un id Mongo válido es obligatorio').isMongoId(),
  check('id').custom( existeArticlePorId ),
  validarCampos
], deleteArticle);

module.exports = router;