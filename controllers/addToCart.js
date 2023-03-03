import {pool} from "../config/database.js";

export default (req, res) => {
    const {products_id, cart_id} = req.body;  
    let sql = "INSERT INTO products_cart (products_id, cart_id) VALUES (?, ?)";
    const paramSql = [products_id, cart_id];
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err
        res.json({result});
    });
};