import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "theofacorat", // identifiant BDD
    password: "154cca7d199ad6d97cf7fc0948a546f5", // le password
    database: "theofacorat_fureneshi" // nom de la base de donnée
});

// pour creer des requet sql async
export const asyncQuery = async (sql, params = []) => {
    return new Promise((resolve, reject)=>{
        pool.query(sql,params, (error, result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}