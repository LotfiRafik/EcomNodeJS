const express = require('express');
const fournisseurController = require('../controllers/fournisseurs_controller');

const route = express.Router();

route.get('/', (req,res)=>{
    //call controller
    fournisseurController.getAllFournisseurs(req,res);
})

route.get('/:id([0-9]+)', (req,res)=>{
    //call controller
    fournisseurController.getFournisseur(req,res);
})

route.post('/:id([0-9]+)/update', (req,res)=>{
    //call controller
    fournisseurController.updateFournisseur(req,res);
})

route.all('/:id([0-9]+)/delete', (req,res)=>{
    //call controller
    fournisseurController.deleteFournisseur(req,res);
})

route.all('/insert', (req,res)=>{
    //call controller
    fournisseurController.insertFournisseur(req,res);
})


module.exports = route;