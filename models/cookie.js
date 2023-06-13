const mongoose = require('mongoose');

const cookieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Cookie', cookieSchema);