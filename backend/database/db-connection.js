const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI;
const dbConnection = async () => {
  try {
    await mongoose.connect( mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('base de datos local');
  } catch (error) {
    console.error(error);
    throw new Error('Error al iniciar db');
  }
}

module.exports ={
  dbConnection
}

// 'use strict'
//deprecated
//moongose.Promise = global.Promise;
// mongoose.connect( mongourl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })
// .then( () => {
//   console.log('base de datos conectada al puerto 27017')
// });