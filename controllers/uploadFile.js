import {pool} from "../config/database.js"

// Utiliser le middleware pour le téléchargement de fichiers
export default (req, res) => {
    
    const {id} = req.body
    const avatar = req.body.files
    console.log({avatar, data:req.body})
    const sql = "UPDATE users SET avatar = ? WHERE id = ?"
    const paramsSQL = [avatar, id]
    
    console.log(avatar)
    
    pool.query(sql, paramsSQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'avatar.' });
        } else {
            console.log('Avatar enregistrée avec succès.');
            res.status(200).json({ success: true });
        }
    });
}
