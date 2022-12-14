const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const db = require('./config/mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// use index router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running server: `, err);
    }
    console.log(`Success! Server running on port ${port}`);
});