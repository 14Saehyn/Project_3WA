import {pool} from "../config/database.js"

export default async (req, res) => {
    const {products_id} = req.body
    const sql = "SELECT reviews.title, reviews.content, users.first_name, users.last_name, products.title AS products_title FROM reviews JOIN users ON reviews.users_id = users.id JOIN products ON reviews.products_id = products.id WHERE reviews.products_id = ?"
    const paramsSQL = [products_id]
    pool.query(sql, paramsSQL, (err, result) => {
        if(err) throw err
        res.json({result})
    })
}