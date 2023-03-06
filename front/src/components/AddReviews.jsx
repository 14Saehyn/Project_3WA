import {useParams} from "react-router-dom";
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, Fragment, useContext} from "react"
import { StoreContext } from "../tools/context.js"

const AddReviews = () => {
    const {products_id} = useParams();
    const [state] = useContext(StoreContext);
    const [addReview, setAddReview] = useState({
        title: "",
        content: ""
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setAddReview({...addReview, [name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        const data = {
            products_id: products_id,
            users_id: state.user.id,
            title: addReview.title,
            content: addReview.content
        }
        
        axios.post(`${BASE_URL}/addReviews`, data)
            .then((res) => {
                res.data.response && console.log("Avis enregistré");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    return (
        <Fragment>
        {state.isLogged ?
            (<form onSubmit={submit}>
                <h2>Donnez-nous votre avis sur ce manga !</h2>
                <input type="text" placeholder="Votre titre" name="title" onChange={handleChange} value={addReview.title} />
                <textarea placeholder="Votre jugement (complètement osef d'ailleurs) sur cet ouvrage" name="content" onChange={handleChange} value={addReview.content} />
                <input type="submit" />
            </form>)
            :
            (<Fragment>
            <p>Vous devez être connecté(e) pour pouvoir donner un avis !</p>
            </Fragment>)
        }
        </Fragment>
    )
}

export default AddReviews