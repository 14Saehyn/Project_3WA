import {Fragment, useState, useEffect} from 'react'
import {BASE_URL} from "../tools/constante.js"
import axios from 'axios'
import {useParams} from 'react-router-dom'
// import {AppContext} from './reducer/reducer.js'

const UploadFile = () => {
    // const [state, dispatch] = useContext(AppContext)
    
    const {id} = useParams()
    const [successMessage, setSuccessMessage] = useState(null)
    
    useEffect(() => {
        let timeout;
        if (successMessage) {
            timeout = setTimeout(() => {
                setSuccessMessage(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [successMessage, setSuccessMessage]);
    
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();
        const files = {...e.target.picture.files};
        
        // ajouter d'autre input au formulaire
        dataFile.append('id', id)
        dataFile.append('picture', files[0]);
        
        // L'image
        dataFile.append('files', files[0], files[0].name)
        
        axios.post(`${BASE_URL}/productsUploadFile`, dataFile)
        .then((res)=> {
            res.data.response && console.log('Téléchargement effectué');
            setSuccessMessage("Image modifiée avec succès !")
        })
        .catch((err) => {
            console.log(err)
        })
    } 
    
    return (
        <Fragment>
            {successMessage && (
                <p className="success-message profile-message">{successMessage}</p>
            )}
            <h2 className="title_h2">Modifier la couverture</h2>
            <form onSubmit={submit} encType="multipart/form-data">
                <input className="file-chosen" type='file' name='picture'/>
                <input type='submit' value='Modifier' className="text-input"/>
            </form>
        </Fragment>
    )
}

export default UploadFile