import {pool} from "../config/database.js"

export default (req, res) => {
    const sql = "SELECT products.id, categories.name, title, author, publisher, status, price, resume, picture FROM products JOIN categories ON products.categories_id = categories.id"
    pool.query (sql, (err, result) => {
        if (err) throw err
        res.json({result})
    })
}