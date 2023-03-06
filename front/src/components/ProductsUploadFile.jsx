import {Fragment, useState} from 'react'
import {BASE_URL} from "../tools/constante.js"
import axios from 'axios'
import {useParams} from 'react-router-dom'
// import {AppContext} from './reducer/reducer.js'

const UploadFile = () => {
    // const [state, dispatch] = useContext(AppContext)
    
    const {id} = useParams()
    const [successMessage, setSuccessMessage] = useState(null)
    
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
                <p>{successMessage}</p>
            )}
            <h1>Modifier l'image</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name="picture">
                    <input type='file' name='picture'/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </Fragment>
    )
}

export default UploadFile