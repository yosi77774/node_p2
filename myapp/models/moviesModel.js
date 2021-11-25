const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({

    name : String,
    Genres : [String],
    Image : String,
    Premiered : Date
});


module.exports = mongoose.model('movies', MoviesSchema)