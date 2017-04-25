var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var request = require('request');

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.send('hello');
});

app.get('/api/imagesearch/:term', function (req, res) {

    request({
        url: "https://www.googleapis.com/customsearch/v1",
        qs: {
            key: "AIzaSyCAfVwBt7_5etyMLKJygQpCacQuck8RAeA",
            cx: "013817706357435612999:fhkp-enj02c",
            q: req.params.term,
            searchType: "image",
            start: req.query.offset
        }
    }, function (err, response, body) {
        if (err) {
            console.log(err);
        }

        var results = JSON.parse(body);
        console.log(results);

        var items = [];

        results.items.forEach(function (item) {
            items.push({
                url: item.link,
                snippet: item.snippet,
                thumbnail: item.image.thumbnailLink,
                context: item.image.contextLink
            });
        });

        res.json(items);
    });


});



app.listen(port);