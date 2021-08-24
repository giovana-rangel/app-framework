require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const bodyParse = require('body-parser');

const { dbConnection } = require('../database/db-connection');


class Server {
  constructor(){
    this.app = express();
    this.port = process.env.MONGODB_PORT; 

    this.paths = {
      article: '/api/blog',
      uploadFiles:'/api/upload-image'
    }
    
    //Conectar base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    // Rutas de la app
    this.routes();
  }

  async conectarDB(){
    await dbConnection();
  }

  middlewares(){
    //lectura y parseo
    this.app.use( express.json() );
    
    //CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
    });
  
    //directorio público
    this.app.use( express.static('public'));
  }

  routes(){
    this.app.use(this.paths.article, require('../routes/article'));
    this.app.use(this.paths.uploadFiles, require('../routes/uploads'));
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log('Servidor corriendo en puerto', this.port)
    });
  }
}

module.exports = Server;