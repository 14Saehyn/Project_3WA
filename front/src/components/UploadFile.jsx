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
        const files = {...e.target.avatar.files};
        
        // ajouter d'autre input au formulaire
        dataFile.append('id', id)
        dataFile.append('avatar', files[0]);
        
        // L'image
        dataFile.append('files', files[0], files[0].name)
        
        axios.post(`${BASE_URL}/uploadFile`, dataFile)
        .then((res)=> {
            res.data.response && console.log('Téléchargement effectué');
            setSuccessMessage("Avatar modifié avec succès !")
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
            <h2>Ajouter ou modifier l'avatar</h2>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name="avatar">
                    <input type='file' name='avatar'/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </Fragment>
    )
}

export default UploadFile