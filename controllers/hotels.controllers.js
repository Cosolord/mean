var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;

var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {

  var db = dbconn.get();

  // console.log("db", db);

  console.log('GET the hotels');
  console.log(req.query);

  var offset = 0;
  var count = 5;

  var collection = db.collection('hotels');

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found hotels", docs.length);
      res
        .status(200)
        .json(docs);
  });

};

module.exports.hotelsGetOne = function(req, res) {
  var db = dbconn.get();
  var id = req.params.hotelId;
  var collection = db.collection('hotels');
  console.log('GET hotelId', id);

  collection
    .findOne({
      _id : ObjectId(id)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
  });

};

module.exports.hotelsAddOne = function(req, res) {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};