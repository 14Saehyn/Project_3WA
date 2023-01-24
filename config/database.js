import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "theofacorat", // identifiant BDD
    password: "154cca7d199ad6d97cf7fc0948a546f5", // le password
    database: null, // nom de la base de donnée
});