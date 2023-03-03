import {pool} from "../config/database.js"

export default (req, res) => {
    const {products_id} = req.body
    console.log(products_id)
    const sql = "DELETE FROM products_cart WHERE products_id = ?"
    const paramsSQL = [products_id]
    pool.query (sql, paramsSQL, (err, result) =>{
        if (err) throw err
        res.json({result})
    })
}