
const mongoose = require("mongoose");
const Product = require('../models/product');

exports.product_get_all = (req, res, next) => {
    Product.find().exec()
        .then(docs => {
            console.log("Get products details from database: ", docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({error: err})
        });
}

exports.post_product_info = (req, res, next) => {
    console.log('files: ',req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log("result: ",result);
        res.status(201).json({
            product: result,
            message: 'Inserting a product post call'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.put_product_info = (req, res, next) => {
    const id = req.params.productId;
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    Product.update({_id: id}, product).then(result => {
        console.log(result);
        res.status(200).json({
            product: result,
            message: 'updating via post call'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.patch_product_info = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id: id}, {$set: updateOps}).exec()
        .then(doc => {
            console.log('patch call with product id', doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            })
        });
}

exports.delete_product_info = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec().then(response => {
        console.log(response);
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
}

