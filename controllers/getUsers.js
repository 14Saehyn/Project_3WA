import {pool} from "../config/database.js"

export default (req, res) => {
    const sql = "SELECT users.id, roles.name, first_name, last_name, avatar, registration_date FROM users JOIN roles ON users.roles_id = roles.id"
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}