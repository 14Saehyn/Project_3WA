import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../tools/constante.js";
import { useState, useEffect, Fragment } from "react";

const AllReviews = () => {
  const { products_id } = useParams();
  const [allReviews, setAllReviews] = useState([]);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/getReviewsByProductsId/`, { products_id })
      .then((res) => setAllReviews(res.data.result))
      .catch((err) => console.log(err));
  }, [products_id]);

  return (
    <Fragment>
        <div className="header-container">
            <h1 className="header-title">Les avis</h1>
        </div>
        <div className="all-reviews-container">
            {allReviews.length > 0 ? (
                <Fragment>
                    {title && <h2 className="title_h2 allreviews_h2">{`Tous les avis de ${title}`}</h2>}
                    {allReviews.map((review, i) => {
                        !title && setTitle(review.products_title);
                        return (
                            <div key={i} className="review-container">
                                <p className="title">{review.title}</p>
                                <p className="content">{review.content}</p>
                                <p className="author">{`Publié par ${review.first_name} ${review.last_name}`}</p>
                            </div>
                        );
                    })}
                </Fragment>
            ) : (
                <h2 className="title_h2 allreviews_h2">Envoie le premier avis !</h2>
            )}
        </div>
    </Fragment>
  );
};

export default AllReviews;