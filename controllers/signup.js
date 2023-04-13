import {asyncQuery} from "../config/database.js"
import bcrypt from 'bcrypt'

const emailExist = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?"
    const response = await asyncQuery(sql,[email])
    if(response.length > 0) return true
    return false
}

export default async (req, res) => {
    const saltRounds = 10
    const {first_name, last_name, email, password} = req.body
    const avatar = "default.jpg";
    const sql = "INSERT INTO users (first_name, last_name, email, password, avatar, registration_date, roles_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const sqlCart = "INSERT INTO cart (users_id) VALUES (?)";
    
    try {
        // on verrifie si l'email existe en BDD
        const emailPresent = await emailExist(email)
    
        // error a la verrification de l'email
        if(emailPresent === undefined){
            return
        }
        
        const errors = [];
        
        if (emailPresent === true) {
            errors.push("L'email existe déjà.");
        }
        
        if (password.length < 8) {
            errors.push("Mot de passe trop court.");
        }
        
        if (errors.length > 0) {
            return res.status(401).json({ errors });
        }
        
        // On hash le password
        const mdpHash = await bcrypt.hash(password, saltRounds)
        
        // on creer la liste des params pour add user
        const paramsSql = [first_name, last_name, email, mdpHash, avatar, new Date(), 2]
        
        // on fait la requete
        const createUser = await asyncQuery(sql, paramsSql)
        const createCart = await asyncQuery(sqlCart, [createUser.insertId]);
        
        // on retourn la reponse
        res.json({response:createUser, createCart})
    } catch(err) {
        console.log(err)
        return
    }
}