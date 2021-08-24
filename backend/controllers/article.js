const { response } = require('express');
const Article = require('../models/article');

//============ GET ALL ==============
const getArticles = (req, res) => {
  const query = Article.find({});

  const { last } = req.params;
  if( last || last != undefined ){
    query.limit(5);
  }

  query.sort('-_id').exec((err, articles)=>{
    if( err ) return res.status(500).json({msg: 'error en la carga de archivos'})
    
    if ( !articles ) return res.status(404).json({msg: 'no existen archivos'})
  
    res.json({
      status: 'success - get articles',
      articles
    });
  });
}

//============ GET  ==============
const getArticle = async (req, res=response) => {
  try {
    const {id} = req.params;

    const article = await Article.findById(id);
    res.json(article);

  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg:'error'
    })
  }
  
}

//========== GET SEARCH ==========
const search = (req, res) => {
  try {
    const {searchKey} = req.params;

    Article.find({
      "$or": [ 
        {"title": {"$regex": searchKey, "$options": "i"}},
        {"content": {"$regex": searchKey, "$options": "i"}},
      ]
    })
    .sort([['date','descending']])
    .exec((err, articles)=>{
      if(err){return res.status(500).json({msg:'Error al enviar la petición'})}
      if(!articles || articles.length == 0){return res.status(404).send({msg:'No se han encontrado artículos que coincidan con la búsqueda'})}
      else{
        return res.json({articles});
      }
    })

  } catch (error) {
    res.status(400).json({msg:'Error al realizar la petición'});
  }
  
}

//============ POST ==============

const saveArticle = (req = request, res = response) => {
  try {
    const { title, content } = req.body;

    //Crear objeto a guardar 
    const article = new Article();
    //Asignar valores
    article.title = title;
    article.content = content;
    article.image = null;
    //Guardar en db
    article.save((err, articleStored) => {
      if( err || !articleStored ){
        return res.status(500).json({
          msg: 'Error en el guardado de datos en la base de datos'
        })
      }
    });
    //Respuesta ok
    res.status(201).json({
      status: 'success - post article',
      article
    })

  } catch (error) {
    return res.status(400).json({
      msg: 'error en el envio de la petición'
    })
  }
  
}

//============= PUT ===============

const update = async ( req, res ) => {
  try {
    const { id } = req.params;
    const { __v, _id, ...data} = req.body;
    const article = await Article.findByIdAndUpdate({_id: id}, data, {new:true});

    res.json({
      status: 'success - put',
      article
    });
  } catch (error) {
    res.status(400).json({
      msg: 'faild to load resource'
    });
  }
}

//============= PUT ===============

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const articleRemoved = await Article.findByIdAndDelete({_id : id});

    res.json({
      status: 'success - delete',
      articleRemoved
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: 'Error al procesar la petición'
    });
  }
  
}

module.exports= {
  getArticles,
  getArticle,
  saveArticle,
  update,
  deleteArticle,
  search
}