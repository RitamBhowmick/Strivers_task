const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['C++', 'Java', 'JavaScript', 'Python'],
        required: true
    },
    stdin: {
        type: String,
        required: true
    },
    sourceCode: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
    }
},{timestamps: true});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;