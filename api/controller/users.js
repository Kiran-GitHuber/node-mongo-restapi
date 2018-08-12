
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.get_all_users = (req, res, next) => {
    User.find().exec()
        .then(users => {
            console.log("Get users details from database: ", users);
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({error: err})
        });
}

exports.post_signup_info = (req, res, next) => {
    console.log(req.body.email);
    User.find({email: req.body.email}).exec().then(user => {
        console.log(user);
        if (user.length >= 1) {
            return res.status(422).json({message: ' Mailid already exist'})
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    console.log(user);
                    user.save().then(response => {
                        console.log(response);
                        res.status(201).json(response)
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({error: err})
                    });
                }
            })
        }
    }).catch(err => {
        res.status(500).json({message: err})
    });

}

exports.post_login_info = (req, res, next) => {
    console.log("req.body.email", req.body.email);
    User.find({email: req.body.email}).exec().then(user => {
        console.log('user: ', user);
        if (user.length < 1) {
            return res.status(401).json({message: ' Auth failed'})
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            } else {
                if (result) {
                    const doc = {
                        email: user[0].email,
                        userId: user[0]._id
                    };
                    const token = jwt.sign(doc,
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        })
                    console.log(token);
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })
                } else {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
            }
        })
    }).catch(err => {
        res.status(500).json({error: err})
    });

}

exports.delete_user_info = (req, res, next) => {
    const email = req.params.emailId;
    console.log(email);
    User.remove({email: email}).exec().then(response => {
        console.log(response);
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
}