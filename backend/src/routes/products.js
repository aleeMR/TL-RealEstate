const express = require('express');

const productRoutes = express.Router();
const db = require('../db/connection');

var ObjectID = require('mongodb').ObjectID

var collectionName = "products";

productRoutes.route('/products').get(async function (_req, res) {
  const dbConnect = db.getDb();

  dbConnect
    .collection(collectionName)
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error finding the items!');
      } else {
        res.json(result);
      }
    });
});


productRoutes.route('/products/:product_id').get(async function (req, res) {
  const dbConnect = db.getDb();

  let query = {"product_id": parseInt(req.params.product_id)};

  console.log(query);

  let product = await dbConnect
    .collection(collectionName)
    .findOne(query);

  
  if (product){
    res.status(200).send(product);
  } else {
    res.status(404).send({message: "404 product not found"});
  }
  
    
});

productRoutes.route('/products/new').post(function (req, res) {
  const dbConnect = db.getDb();

  
  if (typeof req.body.price !== 'number') {
    return res.status(400).send({ message: 'Error inserting!. Price must be a number'});
  }

  if (typeof req.body.product_id !== 'number') {
    return res.status(400).send({message: 'Error inserting!. Product id must be a number '});
  }

  const data = {
    product_id: req.body.product_id,
    last_modified: null,
    product_name: req.body.product_name,
    price: req.body.price,
  };

  dbConnect
    .collection(collectionName)
    .insertOne(data, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting!');
      } else {
        let m = `Added a new item with id ${result.insertedId}`
        res.status(200).send({message: m});
      }
    });
});

productRoutes.route('/products/update').put(function (req, res) {
  const dbConnect = db.getDb();
  const query = { product_id: parseInt(req.body.product_id) };

  const updates = { $set: {
      last_modified: new Date(),
      product_name: req.body.product_name,
      price: req.body.price,
    }
  };

  dbConnect
    .collection(collectionName)
    .updateOne(query, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send({ message: `Error updating item with id ${query.id}!`});
      } else {
        let m = `Document updated`
        res.status(200).send({message: m});
      }
    });
});

productRoutes.route('/products/delete/:product_id').delete((req, res) => {
  const dbConnect = db.getDb();

  const query = { product_id: parseInt(req.params.product_id) };

  dbConnect
    .collection(collectionName)
    .deleteOne(query, function(err, result){
      if (err || !result) {
        res
          .status(400)
          .send({message: `Error deleting item with product_id ${req.params.product_id}!`});
      } else {
        res.status(200).send({message: 'Document deleted'});
      }
    });
});

module.exports = productRoutes;
