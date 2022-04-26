const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        username : {
            type : String,
            required : true
        },
        firstName : {
            type : String,
            required : true,
            max : [127, "Max Length is 127 characters"]
        },
        lastName : {
            type : String,
            required : true,
            max : [127, "Max Length is 127 characters"]
        },
        bio : {
            type : String,
            required : true,
        },
        nbFollowers : {
            type : Number,
            required : true
        },
        nbFollowing : {
            type : Number,
            required : true
        },
        nbPosts : {
            type : Number,
            required : true
        },
        photoURL: {
            type: mongoose.SchemaTypes.Url,
        },
    },
    { collection : 'users' });

module.exports = mongoose.model('User', userSchema);
