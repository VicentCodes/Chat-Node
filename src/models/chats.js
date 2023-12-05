const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const message = new Schema ({
    user: String,
    message: String,
});

module.exports = mongoose.model('message', message);