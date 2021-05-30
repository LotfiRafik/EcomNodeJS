const dbService = require(__dirname+'/../models/dbService');

class usersController{

    static logout(req, res) {
        req.session.destroy((err) => {
            // cannot access session here
            res.redirect('/users/login/');
          })
    }

    static login(req, res) {

        if(req.method === 'GET'){
            if(req.session.loggedin){
                res.redirect('/');
            }
            res.render('LoginView', {
                data : {
                    req : req
                }
            });
            res.end();
        }
        else{
            if(req.method === 'POST')
            {
                const db = dbService.getDbServiceInstance();
                let credentials = req.body;
                const result = db.login(credentials);
                
                result.then(data => {
                    if(data.length != 0)
                    {
                        req.session.loggedin = true;
                        req.session.username = data[0].username;
                        req.session.usertype = data[0].usertype;
                        req.session.userId = data[0].id;
                        res.redirect('/products/');
                    }
                    else{
                        res.redirect('/users/login/');
                    }
                    res.end();
                }).catch(err => console.log(err));
            }
        }
    };

    static signup(req, res) {

        if(req.method === 'GET'){
            if(req.session.loggedin){
                res.redirect('/');
            }
            res.render('SignUpView', {
                data : {
                    req : req
                }
            });
            res.end();
        }
        else{
            if(req.method === 'POST')
            {
                const db = dbService.getDbServiceInstance();
                let user = req.body;
                user.usertype = 'client';
                const result = db.signup(user);
                
                result.then(data => {
                    req.session.loggedin = true;
                    req.session.username = user.username;
                    req.session.usertype = user.usertype;
                    res.redirect('/');
                }).catch(err => console.log(err));
            }
        }
    };

    static getAllClients(req, res) {
        const db = dbService.getDbServiceInstance();
        const result = db.getAllClients();
        result.then(data => res.render('ClientsListView', {
            data : {
                clients : data,
                req : req
            }
        })).catch(err => console.log(err));
    };

    static getClient(req, res) {
        const db = dbService.getDbServiceInstance();
        const result = db.getClient(req.params.id);
        result.then(data => res.render('ClientDetailView', {
            data : {
                client : data[0],
                req : req
            }
        })).catch(err => console.log(err));
    };

    static updateClient(req, res) {
        const db = dbService.getDbServiceInstance();
        let client = req.body;
        const result = db.updateClient(req.params.id, client);

        res.redirect('/users/clients/'+req.params.id);
    };

    static deleteClient(req, res) {
        const db = dbService.getDbServiceInstance();
        const result = db.deleteClient(req.params.id);

        res.redirect('/users/clients/');
    };
}

module.exports = usersController;