var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var request = require('request');

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

mongoose.connect('mongodb://lani:102030@ds027308.mlab.com:27308/image-search-history');

var Record = mongoose.model('Record', {
    term: String,
    when: String
});

app.get('/', function (req, res) {
    var host = req.get('host');
    var protocol = req.secure ? 'https' : 'http';
    res.render('index', { site: protocol + '://' + host });
});

app.use('/assets', express.static(__dirname + '/public'));

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
        // console.log(results);

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


    // Save search to database

    var now = new Date();
    var nowString = now.toISOString();

    var record = new Record({
        term: req.params.term,
        when: nowString
    });

    record.save();

});


// show latest search history
app.get('/api/latest/imagesearch', function (req, res) {

    Record.
        find().
        limit(10).
        sort({ when: -1 }).
        exec(function (err, records) {
            if (err) return console.error(err);

            var newRecords = [];
            records.forEach(function (record) {
                newRecords.push({
                    term: record.term,
                    when: record.when
                });
            });

            res.json(newRecords);
        });

});


app.listen(port);