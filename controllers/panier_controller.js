const dbService = require(__dirname+'/../models/dbService');

const { response } = require('express');
const productsController = require('./products_controller');

class panierController{

    static getPanier(req, res) {

        const db = dbService.getDbServiceInstance();
        let panier = [];
        let product;
        let products = [];

        if('panier' in req.session){
                for (const [productId, qte] of Object.entries(req.session.panier)) {
                    product = db.getProduct(productId);
                    products.push(product);
                }
                Promise.all(products).then(data => {
                    data.forEach(element => {
                        if(element.length != 0){
                            panier.push({"produit":element[0],"qte":req.session.panier[element[0].id]});
                        }
                    });
                    res.render('PanierView', {
                        data : {
                            panier : panier,
                            req : req
                        }
                    });
                    //res.send(panier);
                }).catch(err => {
                    console.log(err);
                    reject(new Error(err.message));
                });
        }
        else{
            res.render('PanierView', {
                data : {
                    panier : panier,
                    req : req
                }
            });        
        }
    };

    static addPanier(req, res) {


        const db = dbService.getDbServiceInstance();

        //verify the existance of the product
        let product = db.getProduct(req.params.productId);

        product.then(product => {
            if(product.length != 0){
                if(req.method === 'GET'){
                    res.render('AddPanierView', {
                        data : {
                            product : product[0],
                            req : req
                        }
                    });
                }
                else{
                    if(req.method === 'POST'){
                        let qte;
                        if(!('qte' in req.body)){
                            qte = 1;
                        }
                        else{
                            qte = parseInt(req.body.qte);
                            if(qte < 0) qte = 1;
                        }
                        if(!('panier' in req.session)){
                            req.session['panier'] = {};
                        }
                        req.session['panier'][req.params.productId] = qte;
                        res.redirect('/products');
                    }
                }
            }
            else{
                res.redirect('/error');
            }
        }).catch(err => console.log(err));

    };


    static confirmPanier(req, res) {

        if ('panier' in req.session && Object.keys(req.session.panier).length > 0){
            const db = dbService.getDbServiceInstance();
            let ligne, product;
            let lignes = [];
            const result = db.insertCommande(req.session.userId);
            result.then(commandeId => {
                for (const [productId, qte] of Object.entries(req.session.panier)) {
                    product = db.getProduct(productId);
                    product.then(produit => {
                        console.log(produit[0].id, qte, commandeId);
                        ligne = db.insertLigneCommande(produit[0].id, qte, commandeId);
                        lignes.push(ligne);
                    })
                }
                Promise.all(lignes).then(_ => {
                    req.session.panier = {};
                    res.redirect('/commandes');
                })
            }).catch(err => console.log(err));
        }
        else{
            res.redirect('/commandes');
        }

    }

    static getCommandes(req, res) {
        console.log(req.session);
        const db = dbService.getDbServiceInstance();
        let result;
        if (req.session.usertype == 'client'){
            result = db.getClientCommandes(req.session.userId);
        }
        else{
            result = db.getCommandes();
        }
        result.then(data => res.render('CommandesListView', {
            data : {
                commandes : data,
                req : req
            }
        })).catch(err => console.log(err));
    };

    static getLignesCommande(req, res) {
        const db = dbService.getDbServiceInstance();
        const result = db.getLignesCommande(req.params.commandeId);
        result.then(data => res.render('LignesCommandeListView', {
            data : {
                lignesCommande : data,
                req : req
            }
        })).catch(err => console.log(err));
    };

}

module.exports = panierController;