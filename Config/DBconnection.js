const mongoose = require("mongoose");
const ATLAS_URI = require('./config');

mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Database connected');
});
