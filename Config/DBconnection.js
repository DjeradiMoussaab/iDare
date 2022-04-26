const mongoose = require("mongoose");
const ATLAS_URI = require('./config');

mongoose.connect(ATLAS_URI, () => {
    console.log('successful connection to database');
});