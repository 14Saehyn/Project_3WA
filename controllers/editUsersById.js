import {pool} from "../config/database.js"

export default (req, res) => {
    
    const {first_name, last_name, email, password, birthdate, roles_id, id} = req.body
    const sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, birthdate = ?, roles_id = ? WHERE id = ?"
    const paramsSQL = [first_name, last_name, email, password, birthdate, roles_id, id]
    pool.query(sql,paramsSQL,(err, result) => {
        if(err) throw err
        res.json({result})
    })
}