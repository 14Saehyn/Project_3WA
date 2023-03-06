import {asyncQuery} from "../config/database.js"
import bcrypt from "bcrypt"
import {generateToken} from "../config/token.js"

const generateResponse = async (userDataSQL) => {
    const ADMIN_ROLE_ID = 1
    const admin = userDataSQL.roles_id === ADMIN_ROLE_ID

    const userData = {
        id: userDataSQL.id,
        roles_id: userDataSQL.roles_id,
        last_name: userDataSQL.last_name,
        first_name: userDataSQL.first_name,
        email: userDataSQL.email,
        cart_id: userDataSQL.cart_id,
        user: true,
        admin
    }
    
    try {
        const token = await generateToken(userData)
        return {response: true, admin, token, userData, cart_id: userDataSQL.cart_id}
    } catch (err) {
        console.log (err)
        return
    }
}

export default async (req, res) => {
    const {password, email} = req.body
      
    const sql = "SELECT * FROM users WHERE email = ?"
    
    const paramsSql = [email]

    try {
        const result = await asyncQuery(sql, paramsSql)
        if (result.length === 0) {
            return res.status(401).json({response : "Identifiant ou mot de passe incorrect"})
        }
        
        const sqlCartId = "SELECT id FROM cart WHERE users_id = ?";
        const userCart = await asyncQuery(sqlCartId, [result[0].id]);
        
        const userData = {cart_id:userCart[0].id, ...result[0]};
        
        const response = await generateResponse(userData)
        const resultCompare = await bcrypt.compare(password, result[0].password)
        res.json(resultCompare ? {response} : {response: "Identifiant ou mot de passe incorrect"})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}