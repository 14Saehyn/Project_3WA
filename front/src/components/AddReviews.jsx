import {useParams} from "react-router-dom";
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, Fragment, useContext, useEffect} from "react"
import {StoreContext} from "../tools/context.js"

const AddReviews = () => {
    const {products_id} = useParams();
    const [state] = useContext(StoreContext);
    const [successMessage, setSuccessMessage] = useState(null)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [addReview, setAddReview] = useState({
        title: "",
        content: ""
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setAddReview({...addReview, [name]:value})
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
        const {title, content} = addReview;
        const errors = {};
        if (title.trim() === "") {
            errors.title = "Veuillez saisir un titre";
        }
        if (content.trim() === "") {
            errors.content = "Veuillez saisir un message";
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            setSubmitting(true)
            const data = {
                products_id: products_id,
                users_id: state.user.id,
                title: addReview.title,
                content: addReview.content
            }
            axios.post(`${BASE_URL}/addReviews`, data)
            .then((res) => {
                res.data.response && console.log("Avis enregistré");
                setSuccessMessage("Avis enregistré avec succès !")
                setSubmitting(false)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    
    return (
        <Fragment>
            <div className="header-container">
                <h1 className="header-title">Ton avis</h1>
            </div>
            {state.isLogged ? (
                <Fragment>
                    <div className="content-wrapper_header">
                        {successMessage && !errors.title && !errors.content && !submitting && (
                            <p className="success-message profile-message">{successMessage}</p>
                        )}
                        <form onSubmit={submit}>
                            <h2 className="title_h2">Donne-nous ton avis !</h2>
                            <input type="text" placeholder="Titre" name="title" onChange={handleChange} value={addReview.title} />
                            {errors.title && (
                                <span className="delete-message profile-message">{errors.title}</span>
                            )}
                            <textarea placeholder="Avis" name="content" onChange={handleChange} value={addReview.content} />
                            {errors.content && (
                                <span className="delete-message profile-message">{errors.content}</span>
                            )}
                            <div className="user-buttons-container">
                                <input type='submit' value="Confirmer" className="text-input"/>
                            </div>
                        </form>
                    </div>
                </Fragment>
            ) : (
                <div className="content-wrapper_header">
                    <h2 className="title_h2">Il faut que tu sois en ligne pour donner un avis !</h2>
                </div>
            )}
        </Fragment>
    )
}

export default AddReviews