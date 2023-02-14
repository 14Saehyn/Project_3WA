import {Fragment, useState} from 'react'
import {BASE_URL} from "../tools/constante.js"
import axios from 'axios'

// import {AppContext} from './reducer/reducer.js'

const UploadFile = () => {
    // const [state, dispatch] = useContext(AppContext)
    const [name, setName] = useState("")
    
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();
        const files = {...e.target.avatar.files};
        
        console.log(files)
        
        // ajouter d'autre input au formulaire
        dataFile.append('name', name)
        
        // L'image
        dataFile.append('files', files[0], files[0].name)
        
        axios.post(`${BASE_URL}/stockUploadFile`, dataFile)
        .then((res)=> {
            console.log(res)
            res.data.response && console.log('succesfully upload');
        })
        .catch((err) => {
            console.log(err)
        })
    } 
    
    return (
        <Fragment>
            <h1>Ajouter/Modifier l'avatar</h1>
            <form onSubmit={submit} encType="multipart/form-data">
            <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                <label name='avatar'>
                    <input type='file' name='avatar'/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </Fragment>
    )
}

export default UploadFile