import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, Fragment} from "react"

const Contact = () => {
    const [contact, setContact] = useState({
        first_name:'',
        last_name:'',
        email:'',
        content:''
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setContact({...contact,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/contact`, {
           first_name: contact.first_name,
           last_name: contact.last_name,
           email: contact.email,
           content: contact.content
       })
    }
    
    
    return(
        <Fragment>
            <form onSubmit={submit}>
                <input type='text' placeholder='Votre prénom' name='first_name' onChange={handleChange} value={contact.first_name} />
                <input type='text' placeholder='Votre nom' name='last_name' onChange={handleChange} value={contact.last_name} />
                <input type='text' placeholder='Votre email' name='email' onChange={handleChange} value={contact.email} />
                <textarea placeholder="Qu'est-ce que tu veux ?" name="content" onChange={handleChange} value={contact.content} />
                <input type='submit' />
            </form>
        </Fragment>
    )
}

export default Contact