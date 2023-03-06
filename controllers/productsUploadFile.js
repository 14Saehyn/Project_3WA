import express from 'express';
import {pool} from "../config/database.js"

// Utiliser le middleware pour lea téléchargement de fichiers
export default (req, res) => {
    
    const {id} = req.body
    const picture = req.body.files
    const sql = "UPDATE products SET picture = ? WHERE id = ?"
    const paramsSQL = [picture, id]
    
    pool.query(sql, paramsSQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'avatar.' });
        } else {
            res.status(200).json({ success: true });
        }
    });
}