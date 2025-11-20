const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminLoginTokenSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now
    }
});

module.exports = mongoose.model('AdminLoginToken', adminLoginTokenSchema)