const dbService = require(__dirname+'/../models/dbService');

class productsController{

    static getAllProducts(req, res) {
        let result;
        console.log(req.session);
        const db = dbService.getDbServiceInstance();
        let fournisseurId = req.query.fournisseurId;
        if (fournisseurId != null){
            result = db.getFournisseurProducts(fournisseurId);
        }
        else{
            result = db.getAllData();
        }
        result.then(data => res.render('ProductsListView', {
            data : {
                products : data,
                req : req
            }
        })).catch(err => console.log(err));
    };

    static getProduct(id, req, res) {
        const db = dbService.getDbServiceInstance();
        const result = db.getProduct(id);
        result.then(data => res.render('ProductDetailView', {
            data : {
                product : data[0],
                req : req
            }
        })).catch(err => console.log(err));
    };

    static insertProduct(req, res) {

        if(req.method === 'GET'){
            //GET ALL Fournisseurs , Categories
            const db = dbService.getDbServiceInstance();

            let fournisseurs = db.getAllFournisseurs();
            let categories = db.getAllCategories();

            Promise.all([fournisseurs, categories]).then(data =>
                res.render('ProductCreateView', {
                data : {
                    fournisseurs : data[0],
                    categories : data[1],
                    req : req
                }
            }));
        }
        else{
            if(req.method === 'POST')
            {
                const db = dbService.getDbServiceInstance();
                let newProduct = req.body;
                const result = db.insertProduct(newProduct);
                
                result.then(data => res.redirect("/products/")).catch(err => console.log(err));
            }
        }
    };

}

module.exports = productsController;