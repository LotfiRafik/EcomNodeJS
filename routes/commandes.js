const express = require('express');
const panierController = require('../controllers/panier_controller');

const route = express.Router();

route.all('/', (req,res)=>{
    //call controller
    panierController.getCommandes(req,res);
})

route.all('/:commandeId([0-9]+)/lignes', (req,res)=>{
    //call controller
    panierController.getLignesCommande(req,res);
})

module.exports = route;