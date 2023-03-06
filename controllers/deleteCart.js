import {pool} from "../config/database.js"

export default (req, res) => {
    const {cart_id} = req.body
    const sql = "DELETE FROM products_cart WHERE cart_id = ?"
    const paramsSQL = [cart_id]
    pool.query (sql, paramsSQL, (err, result) =>{
        if (err) throw err
        res.json({result})
    })
}