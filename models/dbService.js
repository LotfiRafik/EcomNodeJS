const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    else{
        // console.log('db '+ connection.state);
    }
});

let instance;

class dbService{

    static getDbServiceInstance(){
        return instance ? instance : new dbService();
    }

    async getAllData() {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM produits;";
                connection.query(query, (err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async getAllClients() {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM users WHERE usertype='client';";
                connection.query(query, (err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async getClient(id) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM users WHERE usertype='client' and id=?;";
                connection.query(query,[id],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async getProduct(id) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM produits WHERE id=?;";
                connection.query(query,[id],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async updateClient(id, client) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "UPDATE users SET lastname = ?,firstname = ? WHERE usertype='client' and id=?;";
                connection.query(query,[client.lastname, client.firstname, id],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteClient(id) {
        id = parseInt(id);
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "DELETE FROM users WHERE id = ? AND usertype='client';";
                connection.query(query, [id],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            return response == true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async getFournisseur(id) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM fournisseurs WHERE id=?;";
                connection.query(query,[id],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async getLignesCommande(commandeId) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM lignescommande WHERE commande=?;";
                connection.query(query,[commandeId],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async updateFournisseur(id, fournisseur) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "UPDATE fournisseurs SET nom = ?, prenom = ? WHERE id=?;";
                connection.query(query,[fournisseur.nom, fournisseur.prenom, id],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteFournisseur(id) {
        id = parseInt(id);
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "DELETE FROM fournisseurs WHERE id = ?;";
                connection.query(query, [id],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response == true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async login(credentials) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM users WHERE username = ? AND password = ?;";
                connection.query(query,[credentials.username, credentials.password],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async signup(user) {
        try{
            const insertId = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO users (username,email,password,firstname,lastname,usertype) VALUES (?,?,?,?,?,?);";
                connection.query(query, [user.username, user.email, user.password, user.firstname, user.lastname, user.usertype],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return {
                id: 55
            };

        }
        catch(error){
            console.log(error);
        }
    }

    async getAllFournisseurs() {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM fournisseurs;";
                connection.query(query, (err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async getAllCategories() {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM categories;";
                connection.query(query, (err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;

        }
        catch(error){
            console.log(error);
        }
    }

    async getCommandes() {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM commandes;";
                connection.query(query, (err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async getClientCommandes(clientId) {
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM commandes where client=?;";
                connection.query(query, [clientId],(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }


    async insertProduct(product) {
        try{
            const insertId = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO produits (designation,prix,fournisseur,categorie) VALUES (?,?,?,?);";
                connection.query(query, [product.designation, product.prix, product.fournisseur, product.categorie],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            //console.log(response);
            return {
                id: insertId
            };

        }
        catch(error){
            console.log(error);
        }
    }

    async insertFournisseur(fournisseur) {
        try{
            const insertId = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO fournisseurs (nom,prenom,adresse,tel,sexe) VALUES (?,?,?,?,?);";
                connection.query(query, [fournisseur.nom, fournisseur.prenom, fournisseur.adresse, fournisseur.tel, fournisseur.sexe],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            //console.log(response);
            return {
                id: insertId
            };

        }
        catch(error){
            console.log(error);
        }
    }


    async insertCommande(clientId) {
        try{
            const insertId = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO commandes (client) VALUES (?);";
                connection.query(query, [clientId],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            //console.log(response);
            return insertId;
        }
        catch(error){
            console.log(error);
        }
    }


    async insertLigneCommande(productId,qte,commandeId) {
        
        try{
            const insertId = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO lignescommande (produit,qte,commande) VALUES (?,?,?);";
                connection.query(query, [productId, qte, commandeId],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            //console.log(response);
            return insertId;
        }
        catch(error){
            console.log(error);
        }

    }



}


module.exports = dbService;