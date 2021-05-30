const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Joi = require('joi');
var session = require('express-session');

const app = express();

//midlleware
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended : false}));

app.use(session({
	secret: 'x300y500z800allo05',
	resave: true,
	saveUninitialized: true
}));

app.set('view engine', 'ejs');


//URLS

//home page
app.get('/', (req,res)=>{
    res.redirect('/products/');
})


const products = require('./routes/products');
const users = require('./routes/users');
const fournisseurs = require('./routes/fournisseurs');
const panier = require('./routes/panier');
const commandes = require('./routes/commandes');

app.use('/products', products);
app.use('/users', users);
app.use('/fournisseurs', fournisseurs);
app.use('/panier', panier);
app.use('/commandes', commandes);


app.listen(3000);