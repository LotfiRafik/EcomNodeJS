const express = require('express');
const productsController = require('../controllers/products_controller');

//multer options
const multer = require('multer');

const upload = multer({
	dest: 'static/images/products',
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
});

const route = express.Router();

route.get('/', (req,res)=>{
    //call controller
    productsController.getAllProducts(req,res);
})

route.post('/insert', upload.single('image'), (req,res)=>{
    //call controller
    productsController.insertProduct(req,res);
})

route.get('/insert', (req,res)=>{
    //call controller
    productsController.insertProduct(req,res);
})


module.exports = route;