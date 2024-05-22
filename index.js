const express = require('express');

const cors = require('cors');
const mysql = require('./Config/mysql');
const app = express();

app.use(cors())
app.use(express.json())

mysql.connect((error)=>{
    if(error) throw error;
    console.log("Connecté à la base de données");
})


app.get('/', (req, res) => {
    res.status(200).send("Hello les amis")
})

app.get('/etudiants', (req, res) => {
    let Var = "select * from etudiants" 
    mysql.query(Var, (err, result) => {
        if (err)
            res.status(404).json({ code: "ERR", message: "Not found"});
        res.status(200).json(result)
    })  
})
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
app.listen(port, () => {
    console.log(`Connecté au serveur ${port}`); 
});