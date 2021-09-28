const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    email:String
  });

  const bookModel = mongoose.model('book', bookSchema);


module.exports = bookModel