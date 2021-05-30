const express = require('express');
const panierController = require('../controllers/panier_controller');


const route = express.Router();

route.all('/', (req,res)=>{
    //call controller
    panierController.getPanier(req,res);
})

route.all('/confirm', (req,res)=>{
    //call controller
    panierController.confirmPanier(req,res);
})

route.all('/add/:productId([0-9]+)', (req,res)=>{
    //call controller
    panierController.addPanier(req,res);
})




module.exports = route;