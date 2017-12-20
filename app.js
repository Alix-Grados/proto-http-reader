var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var uri = "mongodb://mongo/dummy-app";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/entry', function(req, res, next) {
    client.connect(uri, function (err, db) {
	    if (err) return next(err);
    	var collection = db.collection('entry');
    	collection.find({}).toArray(function(err, docs) {
			if (err) return next(err);
			return res.json(docs);
    	});
	});
});

router.post('/entry', function(req, res, next) {
	client.connect(uri, function (err, db) {
	    if (err) return next(err);
    	var collection = db.collection('entry');
    	collection.insert(req.body, function(err, result) {
			return res.json({ result: "success" });
    	});
	});
});

module.exports = router;
