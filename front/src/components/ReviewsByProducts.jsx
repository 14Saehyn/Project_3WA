import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, Fragment} from "react"

const AllReviews = () => {
    const {products_id} = useParams();
    const [allReviews, setAllReviews] = useState([]);
    const [title, setTitle] = useState(null);
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getReviewsByProductsId/`,{products_id})
            .then(res => setAllReviews(res.data.result))
            .catch(err => console.log(err))
    }, [products_id])
    
    return(
        <Fragment>
        {allReviews.length > 0 ? (
            <Fragment>
                {title && <h2>{`Tous les avis de ${title}`}</h2>}
                    {allReviews.map((review, i) => {
                        !title && setTitle(review.products_title)
                        return (
                            <Fragment key={i}>
                                <p>{review.title}</p>
                                <p>{review.content}</p>
                                <p>{`Publié par ${review.first_name} ${review.last_name}`}</p>
                            </Fragment>
                        )
                    })}
            </Fragment>
        ) : (
        <h2>Soyez le premier à donner un avis !</h2>
        )}
        </Fragment>
    )
}

export default AllReviews