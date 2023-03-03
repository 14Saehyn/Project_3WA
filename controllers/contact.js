import {asyncQuery} from "../config/database.js"

export default async (req, res) => {
    const {first_name, last_name, email, content} = req.body
    const sql = "INSERT INTO contact (first_name, last_name, email, content, date) VALUES (?, ?, ?, ?, ?)"
    try {
        const paramsSQL = [first_name, last_name, email, content, new Date()]
        const createContact = await asyncQuery (sql, paramsSQL)
        return {response: createContact}
    } catch (err) {
        console.log (err)
        return
    }
}