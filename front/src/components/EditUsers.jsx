import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, Fragment} from "react"
import UploadFile from "./UploadFile.jsx"

const EditUsers = () => {
    const {id} = useParams();
    const [user, setUser] = useState({
      first_name: "",
      last_name: "",
      email: "",
      roles_id: "",
    });
    const [successMessage, setSuccessMessage] = useState(null)
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getUsersById`, {id})
            .then(res => {
                const data = res.data.result[0]
                setUser(data)
            })
            .catch(err => console.log(err))
    }, [id])
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    
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
        axios.post(`${BASE_URL}/editUsersById`, {...user})
        .then(res => {
            setSuccessMessage("Informations modifiées avec succès !");
        })
        .catch(err => console.log(err))
    }
    
    return (
        <Fragment>
            <div className="header-container">
                <h1 className="header-title">Profil</h1>
            </div>
            <div className="content-wrapper_header">
                {successMessage && (
                    <p className="success-message profile-message">{successMessage}</p>
                )}
                <UploadFile />
                <div className="user-infos-container">
                    <h2 className="title_h2">Modifier les informations</h2>
                    <form onSubmit={submit}>
                        <input type='text' name='first_name' placeholder='Nouveau prénom' onChange={handleChange} value={user.first_name} />
                        <input type='text' name='last_name' placeholder='Nouveau nom' onChange={handleChange} value={user.last_name} />
                        <input type='text' name='email' placeholder='Nouvel e-mail' onChange={handleChange} value={user.email} />
                        <div>
                            <select name='roles_id' onChange={handleChange} value={user.roles_id}>
                                <option value='1'>Admin</option>
                                <option value='2'>User</option>
                            </select>
                        </div>
                        <input type='submit' value="Modifier" className="text-input"/>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
    
export default EditUsers