const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({

    name : String,
    Email : String,
    City : String

});


module.exports = mongoose.model('members', MembersSchema)