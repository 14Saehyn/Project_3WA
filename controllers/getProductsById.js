import {pool} from "../config/database.js"

export default (req, res) => {
    const {id} = req.body
    const sql = "SELECT * FROM products WHERE id = ?"
    const paramsSQL = [id]
    pool.query(sql,paramsSQL,(err, result) => {
        if(err) throw err
        res.json({result})
    })
}