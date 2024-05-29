//importer mysql et dotenv
const mysql = require("mysql2")
const dotenv = require("dotenv").config();
//creer la connexion vers la base de données
const dataBase= mysql.createConnection({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
}) 

// dataBase.connect((error)=>{
//     if(error) throw error;
//     console.log("database connect successfully");
// })

module.exports= dataBase;