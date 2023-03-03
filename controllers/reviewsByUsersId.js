import {pool} from "../config/database.js"

export default async (req, res) => {
    const {users_id} = req.body
    const sql = "SELECT reviews.id, reviews.title, reviews.content, users.first_name, users.last_name, products.title AS products_title FROM reviews JOIN users ON reviews.users_id = users.id JOIN products ON reviews.products_id = products.id WHERE users.id = ?"
    const paramsSQL = [users_id]
    pool.query(sql, paramsSQL, (err, result) => {
        if(err) throw err
        res.json({result})
    })
}