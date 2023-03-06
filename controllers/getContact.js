import {pool} from "../config/database.js"

export default (req, res) => {
    const sql = "SELECT contact.id, contact.first_name, contact.last_name, contact.email, contact.content, contact.date FROM contact"
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}