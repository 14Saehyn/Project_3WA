import {asyncQuery} from "../config/database.js"
import bcrypt from 'bcrypt'

const emailExist  = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?"
    const response  = await asyncQuery(sql,[email])
    if(response.length > 0) return true
    return false
}

export default async (req, res) => {
    const saltRounds = 10
    const {first_name, last_name, email, password, birthdate} = req.body
    const sql = "INSERT INTO users (first_name, last_name, email, password, registration_date, birthdate, roles_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
    
    if(password.length <= 8){
        return {response:"Mot de passe trop court"}
    }
    
    try {
        // on verrifie si l'email existe en BDD
        const emailPresent = await emailExist(email)
    
        // error a la verrification de l'email
        if(emailPresent === undefined){
            return
        }
        
        // Email deja present en BDD 
        if(emailPresent === true) {
            return {response:"L'email existe déjà"}
        }
        
        // On hash le password
        const mdpHash = await bcrypt.hash(password,saltRounds)
        
        // on creer la liste des params pour add user
        const paramsSql = [first_name, last_name, email, mdpHash, new Date(), birthdate, 2]
        
        // on fait la requete
        const createUser = await asyncQuery(sql, paramsSql)
        
        // on retourn la reponse
        return {response:createUser}
    } catch(err) {
        console.log(err)
        return
    }
}

