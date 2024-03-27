const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
// Middleware to parse JSON in request body
app.use(bodyParser.json());


// data base connection check
require("./databaseConCheck.js");

const userAuthentication = require("./routes/auth.js");
app.use('/', userAuthentication);

app.listen(8000, ()=>{
    console.log('Alhamdulillah...Backend Server is Listening...');
});