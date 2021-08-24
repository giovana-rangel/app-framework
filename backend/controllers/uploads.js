const path = require('path');
const fs = require('fs');
const {response, request} = require('express');
const Article = require('../models/article');


const cargarImagen = async (req = request, res = response) => {
  try {
    if (!req.files){
      return res.status(404).json({
        error: 'No se han subido archivos'
      })
    }
  
    const file_path = req.files.file0.path;
    const file_split = file_path.split('\\');
    const file_name = file_split[2];
    const extension_split = file_name.split('.'); 
    const file_ext = extension_split[1];
  
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(file_ext)) {
      fs.unlink(file_path, (err) => {
        return res.status(400).json({
          error: `Formato ${file_ext} no válido`
        });
      })
    }else{
      const {id} = req.params;
      const articleUptdated = await Article.findOneAndUpdate({_id:id}, {image: file_name}, {new:true});
      return res.json({
        status: 'archivo cargado exitosamente',
        articleUptdated
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      error
    })
  }
}

const getImagen = (req, res) => {
  const { image } = req.params;
  const path_file = './upload/articles/' + image;
  fs.access(path_file, (err) => {
    if (err) {
      return res.status(404).json({msg: "La imagen no existe"});
    } else {
      return res.sendFile(path.resolve(path_file));
    }
});
}

module.exports = {
  cargarImagen,
  getImagen,
}