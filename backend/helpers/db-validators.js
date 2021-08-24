const Article  = require('../models/article');

const existeArticlePorId = async ( id ) => {
  const existeArticle = await Article.findById(id);
  if( !existeArticle ){
    throw new Error(`El artículo ${id} no existe`);
  }
}

module.exports = {
  existeArticlePorId
}