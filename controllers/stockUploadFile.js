import express from 'express';
import uploadFileMiddleware from "./middlewareUploadFile.js";
import {pool} from "../config/database.js"

// Utiliser le middleware pour le téléchargement de fichiers
export default (req, res) => {
    
    const {avatar, files, id} = req.body
    const sql = "UPDATE users SET avatar = ? WHERE id = ?"
    const paramsSQL = [avatar, files, id]
    pool.query(sql,paramsSQL,(err, result) => {
        if(err) throw err
        res.json({result})
    })
    
    /*try {
    // Récupérer les données du formulaire et le fichier envoyé
    const {avatar, files, id} = req.body;

    // Effectuer les opérations souhaitées, par exemple :
    // Enregistrer les informations dans une base de données
    pool.query('UPDATE users SET avatar = ? WHERE id = ?', [avatar, files, id]);

    // Retourner une réponse de succès
    res.json({ success: true });
  } catch (error) {
    console.error(error);

    // Retourner une réponse d'erreur
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la sauvegarde du fichier.' });
  }*/
}