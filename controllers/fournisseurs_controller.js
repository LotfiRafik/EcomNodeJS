const dbService = require(__dirname+'/../models/dbService');

class fournisseursController{

    static getAllFournisseurs(req, res) {
        console.log(req.session);
        const db = dbService.getDbServiceInstance();
        const result = db.getAllFournisseurs();
        result.then(data => res.render('FournisseursListView', {
            data : {
                fournisseurs : data,
                req : req
            }
        })).catch(err => console.log(err));
    };

    static insertFournisseur(req, res) {

        if(req.method === 'GET'){
            //GET ALL Fournisseurs , Categories
            const db = dbService.getDbServiceInstance();

            let fournisseurs = db.getAllFournisseurs();
            let categories = db.getAllCategories();

            Promise.all([fournisseurs, categories]).then(data =>
                res.render('FournisseurCreateView', {
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
                let newFournisseur = req.body;
                const result = db.insertFournisseur(newFournisseur);
                
                result.then(data => res.redirect("/fournisseurs/")).catch(err => console.log(err));
            }
        }
    };

    static getFournisseur(req, res) {
        const db = dbService.getDbServiceInstance();
        const result = db.getFournisseur(req.params.id);
        result.then(data => res.render('FournisseurDetailView', {
            data : {
                fournisseur : data[0],
                req : req
            }
        })).catch(err => console.log(err));
    };

    static updateFournisseur(req, res) {
        const db = dbService.getDbServiceInstance();
        let fournisseur = req.body;
        const result = db.updateFournisseur(req.params.id, fournisseur);

        res.redirect('/fournisseurs/'+req.params.id);
    };

    static deleteFournisseur(req, res) {
        const db = dbService.getDbServiceInstance();
        const result = db.deleteFournisseur(req.params.id);

        res.redirect('/fournisseurs');
    };






}
module.exports = fournisseursController;