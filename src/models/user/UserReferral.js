const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userReferralSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    referrals: {
        type: Number,
        default: 0,
        required: true
    },
    pendingBalance: {
        type: Number,
        default: 0.0,
        required: true
    },
    alltimeEarnings: {
        type: Number,
        default: 0.0,
        required: true
    }
});

module.exports = mongoose.model('UserReferral', userReferralSchema)