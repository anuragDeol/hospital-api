const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/hospital-api`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function() {
    console.log('Success! Connected to MongoDB database');
});

module.exports = db;
