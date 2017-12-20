var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var hostname = process.env.API_HOST | 'localhost';
var port = process.env.API_PORT || 3000;
var mongoHost = process.env.MONGO_HOST | 'localhost';
var uri = "mongodb://mongo:27017/overkiz";
const dbName = 'overkizEntries';

var app = express();

app.use(bodyParser.json());

app.get('/', function(request, response, next){

    MongoClient.connect(uri, function (err, client) {
        if (err) return next(err);
        console.log("connexion ok");
        const db = client.db(dbName);
        const collection = db.collection('entry');
        collection.find({}).toArray(function(err, docs) {
            if (err) return next(err);
            response.send(docs);
        });

        client.close();
    });

});

app.post('/', function(request, response, next){
    console.log(request.body);
    MongoClient.connect(uri, function (err, client) {
        if (err) return next(err);
        console.log("connexion db ok")
        const db = client.db(dbName);
        const collection = db.collection('entry');
        collection.insert({"content": request.body }, function(err, result) {
            return;
        });
        client.close();
    });
    response.send(request.body);
})


var server = app.listen(port, function() {
    console.log('Listening at http://localhost:' + port);
});


