var express = require('express');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.send('hello');
})


app.listen(port);