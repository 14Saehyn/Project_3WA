import {pool} from "../config/database.js"

export default async (req, res) => {
    const {title, author, publisher, status, price, resume, categories_id, id} = req.body
    const sql = "UPDATE products SET title = ?, author = ?, publisher = ?, status = ?, price = ?, resume = ?, categories_id = ? WHERE id = ?"
    const paramsSQL = [title, author, publisher, status, price, resume, categories_id, id]
    pool.query(sql,paramsSQL,(err, result) => {
        if(err) throw err
        res.json({result})
    })
}