const express = require('express');
const productsController = require('../controllers/products_controller');


const route = express.Router();

route.get('/', (req,res)=>{
    //call controller
    productsController.getAllProducts(req,res);
})

route.all('/insert', (req,res)=>{
    //call controller
    productsController.insertProduct(req,res);
})


module.exports = route;