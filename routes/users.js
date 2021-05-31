const express = require('express');
const panierController = require('../controllers/panier_controller');
const usersController = require('../controllers/users_controller');


const route = express.Router();

// route.get('/', (req,res)=>{
//     //call controller
//     productsController.getAllProducts(req,res);
// })

route.all('/login', (req,res)=>{
    //call controller
    usersController.login(req,res);
})

route.get('/logout', (req,res)=>{
    //call controller
    usersController.logout(req,res);
})

route.all('/signup', (req,res)=>{
    //call controller
    usersController.signup(req,res);
})


route.all('/clients', (req,res)=>{
    //call controller
    usersController.getAllClients(req,res);
})

route.get('/clients/:id([0-9]+)', (req,res)=>{
    //call controller
    usersController.getClient(req,res);
})

route.post('/clients/:id([0-9]+)/update', (req,res)=>{
    //call controller
    usersController.updateClient(req,res);
})

route.all('/clients/:id([0-9]+)/delete', (req,res)=>{
    //call controller
    usersController.deleteClient(req,res);
})


module.exports = route;