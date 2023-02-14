import formidable from 'formidable';
import path from 'path';
import fs from 'fs';


const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
const imageDirectory = 'public/img';
const MAX_FIELD_SIZE = 20 * 1024 * 1024;

const form = formidable({
      multiples: false,
      keepExtensions: true,
      encoding: 'utf-8',
      maxFieldsSize: MAX_FIELD_SIZE,
});

const checkAcceptedExtensions = (file) => {
    const type = file.mimetype.split('/').pop();
    return allowedExtensions.includes(type);
}

export default async (req, res, next) => {
    form.parse(req, async (err, fields, files) => {
        if (err) {
            // si le fichier est trop lourd
            if (err.code === 'LIMIT_FIELD_SIZE') {
              return res.status(400).json({ error: `Le fichier dépasse la taille maximum autorisée de ${MAX_FIELD_SIZE / 1024 / 1024} Mo.` });
            }
            return res.status(500).json({ error: 'Le fichier ne peut pas être traité.' });
        }
        
        const file = files.files;
        // si on a pas de fichier
        if (!file || file.size === 0) {
            return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
        }
        
        // si l'extention n'est pas conforme
        if (!checkAcceptedExtensions(file)) {
            return res.status(400).json({ error: 'Type de fichier non valide.' });
        }
        
        const newFilename = `${file.newFilename}`;
        const newPath = path.join(imageDirectory, newFilename);
        
        // on verrifie si le dossier existe
        if (!fs.existsSync(imageDirectory)) {
            return res.status(500).json({ error: `Le dossier ${imageDirectory} n'existe pas.` });
        }
        
        try {
            await fs.promises.copyFile(file.filepath, newPath);
        } catch (e) {
            return res.status(500).json({ error: 'Le fichier ne peut pas être enregistré.' });
        }
        
        req.body = fields;
        req.body.files = files.files.newFilename;
        next();
    });
};