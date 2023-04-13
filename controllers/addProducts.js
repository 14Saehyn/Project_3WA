import {asyncQuery} from "../config/database.js"

export default async (req, res) => {
    const {title, author, publisher, status, price, resume, categories_id, files} = req.body
    const sqlModifyResume = "ALTER TABLE products MODIFY COLUMN resume TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    const sql = "INSERT INTO products (title, author, publisher, status, price, resume, categories_id, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    try {
        await asyncQuery(sqlModifyResume)
        const paramsSQL = [title, author, publisher, status, price, resume, categories_id, files]
        const createProduct = await asyncQuery (sql, paramsSQL)
        return res.json({response: createProduct})    
    } catch (err) {
        console.log (err)
        return
    }
}