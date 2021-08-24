const { Schema, model } = require('mongoose');

const articleSchema = Schema({
  title: { type: String },
  content: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String },
});

module.exports = model('Article', articleSchema);