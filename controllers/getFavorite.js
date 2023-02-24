import {pool} from "../config/database.js"

export default (req, res) => {
    const {categories_id} = req.body
    const sql = "SELECT * FROM products WHERE categories_id = 5"
    const paramsSQL = [categories_id]
    pool.query(sql,paramsSQL,(err, result) => {
        if(err) throw err
        res.json({result})
    })
}