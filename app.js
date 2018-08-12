const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users')

const mongoDB = 'mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@cluster0-ctelt.mongodb.net/test';
mongoose.connect(mongoDB,{useNewUrlParser:true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('set headers');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type, Authorization');
    if (req.methods === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use('/uploads',express.static('uploads'));
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
module.exports = app;