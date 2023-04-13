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
        {state.isLogged ?
            (<div>
                {successMessage && !errors.title && !errors.content && !submitting && (
                    <p>{successMessage}</p>
                )}
                <form onSubmit={submit}>
                    <h1>Donnez-nous votre avis sur ce manga !</h1>
                    <input type="text" placeholder="Votre titre" name="title" onChange={handleChange} value={addReview.title} />
                    {errors.title && (
                        <span>{errors.title}</span>
                    )}
                    <textarea placeholder="Votre jugement (complètement osef d'ailleurs) sur cet ouvrage" name="content" onChange={handleChange} value={addReview.content} />
                    {errors.content && (
                        <span>{errors.content}</span>
                    )}
                    <input type="submit" />
                </form>
            </div>)
            :
            (<div>
            <p>Vous devez être connecté(e) pour pouvoir donner un avis !</p>
            </div>)
        }
        </Fragment>
    )
}

export default AddReviews