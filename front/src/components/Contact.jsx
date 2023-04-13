import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, Fragment, useEffect} from "react"

const Contact = () => {
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [contact, setContact] = useState({
        first_name:'',
        last_name:'',
        email:'',
        content:''
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setContact({...contact,[name]:value})
        setErrors({...errors, [name]:value.trim() === ""})
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
        const {first_name, last_name, email, content} = contact;
        const errors = {};
        if (first_name.trim() === "") {
            errors.first_name = "Veuillez saisir un prénom";
        }
        if (last_name.trim() === "") {
            errors.last_name = "Veuillez saisir un nom";
        }
        if (email.trim() === "") {
            errors.email = "Veuillez saisir un e-mail";
        }
        if (content.trim() === "") {
            errors.content = "Veuillez saisir un message";
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            setSubmitting(true)
            const data = {
                first_name: contact.first_name,
                last_name: contact.last_name,
                email: contact.email,
                content: contact.content
            }
            axios.post(`${BASE_URL}/contact`, data)
            .then ((res) => {
                res.data.response && console.log("Message envoyé");
                setSuccessMessage("Message envoyé avec succès !");
                setSubmitting(false)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    return(
        <Fragment>
            <div>
                {successMessage && !errors.first_name && !errors.last_name && !errors.email && !errors.content && !submitting && (
                    <p>{successMessage}</p>
                )}
                <form onSubmit={submit}>
                    <h1>Envoyez-nous un message !</h1>
                    <input type='text' placeholder='Votre prénom' name='first_name' onChange={handleChange} value={contact.first_name} />
                    {errors.first_name && (
                        <span>{errors.first_name}</span>
                    )}
                    <input type='text' placeholder='Votre nom' name='last_name' onChange={handleChange} value={contact.last_name} />
                    {errors.last_name && (
                        <span>{errors.last_name}</span>
                    )}
                    <input type='email' placeholder='Votre email' name='email' onChange={handleChange} value={contact.email} />
                    {errors.email && (
                        <span>{errors.email}</span>
                    )}
                    <textarea placeholder="Qu'est-ce que tu veux ?" name="content" onChange={handleChange} value={contact.content} />
                    {errors.content && (
                        <span>{errors.content}</span>
                    )}
                    <input type='submit' />
                </form>
            </div>
        </Fragment>
    )
}

export default Contact