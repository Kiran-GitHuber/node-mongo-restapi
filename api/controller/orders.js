const Order = require('../models/order');
const Product = require('../models/product');

const mongoose = require("mongoose");

exports.order_get_all = (req,res,next)=>{
    Order.find().exec().then(
        docs => {
            res.status(200).json(docs);
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            })
        }
    )
}

exports.order_post_order = (req,res,next)=>{
    Product.findById(req.body.productId).exec().then(product => {
        if(!product){
            return res.status(404).json({ message:"product not found"});
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save();
    }).then(result => {
        console.log(result);
        res.status(201).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.order_get_order = (req,res,next)=>{
    const id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({
            message: 'Your order so special'
        })
    }else {
        res.status(200).json({
            message: req.params.orderId+'Your orderID not special in'
        })
    }
}


