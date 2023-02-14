import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState} from "react"

const Signup = () => {
    const [userData, setUserData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        birthdate: ''
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setUserData({...userData,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/signup`,{
           first_name:userData.first_name,
           last_name:userData.last_name,
           email:userData.email,
           password:userData.password,
           birthdate: userData.birthdate
       })
    }
    
    
    return(
        <form onSubmit={submit}>
            <input type='text' placeholder='Votre prénom' name='first_name' onChange={handleChange} value={userData.first_name} />
            <input type='text' placeholder='Votre nom' name='last_name' onChange={handleChange} value={userData.last_name} />
            <input type='text' placeholder='Votre email' name='email' onChange={handleChange} value={userData.email} />
            <input type='password' placeholder='Votre mot de passe' name='password' onChange={handleChange} value={userData.password} />
            <input type='date' name='birthdate' onChange={handleChange} value={userData.birthdate} min='1923-01-01' max='2023-12-31' />
            <input type='submit' />
        </form>    
    )
}

export default Signup