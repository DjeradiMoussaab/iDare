const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        username : String,
        firstName : String,
        lastName : String,
        bio : String,
        nbFollowers : Number,
        nbFollowing : Number,
        nbPosts : Number,
        photoURL: {
            type: mongoose.SchemaTypes.Url,
        },
        hash : String,
        salt : String,
    },
    { collection : 'users' });

module.exports = mongoose.model('User', userSchema);
