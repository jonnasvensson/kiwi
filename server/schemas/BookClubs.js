const mongoose = require('mongoose');

const bookClubSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('BookClubs', bookClubSchema);