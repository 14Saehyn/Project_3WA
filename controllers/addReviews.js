import {asyncQuery} from "../config/database.js"

export default async (req, res) => {
    const {products_id, users_id, title, content} = req.body
    const sql = "INSERT INTO reviews (products_id, users_id, title, content) VALUES (?, ?, ?, ?)"
    try {
        const paramsSQL = [products_id, users_id, title, content]
        const createReview = await asyncQuery (sql, paramsSQL)
        return {response: createReview}
    } catch (err) {
        console.log (err)
        return
    }
}