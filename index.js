const express = require('express');

const cors = require('cors');
const mysql = require('./Config/mysql');

const app = express();
//Implementer swagger pour la documentation de l'API
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API CRUD DOCUMENTATION',
            version: '1.0.0',
            description: 'API CRUD',
            contact: {
                name: 'PEDRO',
                email: 'pedrodalmeida18@gmail.com',
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./index.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.use(cors())
app.use(express.json())
//se connecter à la base de données
mysql.connect((error)=>{
    if(error) throw error;
    console.log("Connecté à la base de données");
})

//envoyer une requete pour tester si tout est en place
app.get('/', (req, res) => {
    res.status(200).send("Hello les amis")
})
/**
     * @swagger
     * /etudiants:
     *   get:
     *     summary: Obtenir la liste de tous les étudiants
     *     responses:
     *       200:
     *         description: Liste de tous les étudiants
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id_etudiant:
     *                     type: integer
     *                   nom_etudiant:
     *                     type: string
     *                   prenom_etudiant:
     *                     type: string
     *       404:
     *         description: Étudiants non trouvés
     */
//recuperer toutes les informations de l'etudiants
app.get('/etudiants', (req, res) => {
    let Var = "select * from etudiants" 
    mysql.query(Var, (err, result) => {
        if (err)
            res.status(404).json({ code: "ERR", message: "Not found"});
        res.status(200).json(result)
    })  
})
/**
     * @swagger
     * /etudiants/create:
     *   post:
     *     summary: Insérer un étudiant dans la base de données
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nom:
     *                 type: string
     *               prenom:
     *                 type: string
     *     responses:
     *       201:
     *         description: Étudiant créé avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id_etudiant:
     *                   type: integer
     *                 nom_etudiant:
     *                   type: string
     *                 prenom_etudiant:
     *                   type: string
     *       404:
     *         description: Erreur lors de la création de l'étudiant
     */
    //ajouter un etudiant à la base de données
app.post('/etudiants/create', (req, res) => {
    let { nom, prenom } = req.body;
    console.log(nom);
    console.log(prenom);
    let create = "insert into etudiants(nom_etudiant,prenom_etudiant)values(?,?)";   
    mysql.query(create,[nom, prenom], (err, result) => {
        if (err)
            res.status(404).json({ code: "ERRRRRRR", message: "Not create"});
        res.status(201).json(result)
    })  
})
/**
     * @swagger
     * /etudiants/{id}:
     *   get:
     *     summary: Récupérer les informations d'un étudiant par ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID de l'étudiant
     *     responses:
     *       200:
     *         description: Informations de l'étudiant
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id_etudiant:
     *                   type: integer
     *                 nom_etudiant:
     *                   type: string
     *                 prenom_etudiant:
     *                   type: string
     *       404:
     *         description: Étudiant non trouvé
     */
    //recuperer les informations d'un etudiant à partir de son id
app.get('/etudiants/:id', (req, res) => {
    let{id} = req.params;
    // console.log(nom);
    // console.log(prenom);
    let create = "select * from etudiants where id_etudiant=?";   
    mysql.query(create,id, (err, result) => {
        if (err)
            res.status(404).json({ code: "ERRRRRRR", message: "Not recup"});
        res.status(200).json(result)
    })  
})
/**
     * @swagger
     * /etudiants/{id}:
     *   put:
     *     summary: Modifier un étudiant dans la base de données
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID de l'étudiant
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nom:
     *                 type: string
     *               prenom:
     *                 type: string
     *     responses:
     *       200:
     *         description: Étudiant modifié avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 nom:
     *                   type: string
     *                 prenom:
     *                   type: string
     *       404:
     *         description: Erreur lors de la modification de l'étudiant
     */
    //modifier un etudiant dans la bd
app.put('/etudiants/:id', (req, res) => {
    let { id } = req.params;
     let { nom, prenom } = req.body;
    // console.log(nom);
    // console.log(prenom);
    let update = "UPDATE `etudiants` SET `nom_etudiant` = ? ,`prenom_etudiant`=? WHERE `etudiants`.`id_etudiant` = ?;"
    mysql.query(update, [nom, prenom, id] ,(err, result) => {
        if (err)
            res.status(404).json({ code: "ERRRRRRR", message: "Not recup" });
        console.log(err);
        res.status(200).json({
            id:id,
            nom:nom,
            prenom:prenom,
         })
    })  
})
/**
     * @swagger
     * /etudiants/{id}:
     *   delete:
     *     summary: Supprimer un étudiant de la base de données
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID de l'étudiant
     *     responses:
     *       200:
     *         description: Étudiant supprimé avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *       404:
     *         description: Erreur lors de la suppression de l'étudiant
     */
    //Pour supprimer un etudiant de la bd à partir de son id
app.delete('/etudiants/:id', (req, res) => {
    let { id } = req.params;
    //  let { nom, prenom } = req.body;
    // console.log(nom);
    // console.log(prenom);
    let deleted = "DELETE FROM `etudiants` WHERE `etudiants`.`id_etudiant` = ?"
    mysql.query(deleted,id ,(err, result) => {
        if (err)
            res.status(404).json({ code: "ERRRRRRR", message: "Not recup" });
        console.log(err);
        res.status(200).json({
            id:id,
         })
    })  
})

const port = 5000; 
//demarer le serveur node
app.listen(port, () => {
    console.log(`Connecté au serveur ${port}`); 
});