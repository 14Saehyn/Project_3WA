import {asyncQuery} from "../config/database.js"
import bcrypt from "bcrypt"
import {generateToken} from "../config/token.js"

const generateResponse = async (userDataSQL) => {
    console.log(userDataSQL)
    const ADMIN_ROLE_ID = 1
    const admin = userDataSQL.role_id === ADMIN_ROLE_ID

    const userData = {
        id: userDataSQL.id,
        role_id: userDataSQL.role_id,
        last_name: userDataSQL.last_name,
        first_name: userDataSQL.first_name,
        email: userDataSQL.email,
        user: true,
        admin
    }
    
    try {
        const token = await generateToken(userData)
        return {response: true, admin, token, userData}
    } catch (err) {
        console.log (err)
        return
    }
}

export default async (req, res) => {
    const {password, email} = req.body
    console.log (email)
      
    const sql = "SELECT * FROM users WHERE email = ?"
    
    const paramsSql = [email]

    try {
        const result = await asyncQuery(sql, paramsSql)
        if (result.length === 0) {
            return res.json({response : "Information erronée"})
    }
    const response = await generateResponse(result[0])
    const resultCompare = await bcrypt.compare(password, result[0].password)
    res.json(resultCompare ? {response} : {response: "Information erronée"})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}