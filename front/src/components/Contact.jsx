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
            <div className="header-container">
                <h1 className="header-title">Contact</h1>
            </div>
            <Fragment>
                <div className="content-wrapper_header">
                    {successMessage && !errors.first_name && !errors.last_name && !errors.email && !errors.content && !submitting && (
                        <p className="success-message profile-message">{successMessage}</p>
                    )}
                    <form onSubmit={submit}>
                        <h2 className="title_h2">Envoyez-nous un message !</h2>
                        <input type='text' placeholder='Votre prénom' name='first_name' onChange={handleChange} value={contact.first_name} />
                        {errors.first_name && (
                            <span className="delete-message profile-message">{errors.first_name}</span>
                        )}
                        <input type='text' placeholder='Votre nom' name='last_name' onChange={handleChange} value={contact.last_name} />
                        {errors.last_name && (
                            <span className="delete-message profile-message">{errors.last_name}</span>
                        )}
                        <input type='email' placeholder='Votre email' name='email' onChange={handleChange} value={contact.email} />
                        {errors.email && (
                            <span className="delete-message profile-message">{errors.email}</span>
                        )}
                        <textarea placeholder="Votre message" name="content" onChange={handleChange} value={contact.content} />
                        {errors.content && (
                            <span className="delete-message profile-message">{errors.content}</span>
                        )}
                        <div className="user-buttons-container">
                            <input type='submit' value="Envoyer" className="text-input"/>
                        </div>
                    </form>
                </div>
            </Fragment>
        </Fragment>
    )
}

export default Contact