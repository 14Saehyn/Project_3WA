import {pool} from "../config/database.js";

export default (req, res) => {
    const sql = "SELECT reviews.id, reviews.title, reviews.content, users.avatar, users.first_name, users.last_name, products.title AS products_title FROM reviews JOIN users ON reviews.users_id = users.id JOIN products ON reviews.products_id = products.id"
    pool.query(sql, (err, result) => {
        if(err) throw err
        res.json({result})
    })
}