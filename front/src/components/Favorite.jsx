import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment} from "react"
import {NavLink} from "react-router-dom"

const Favorite = () => {
    const [favoriteList, setFavoriteList] = useState([])
    
    useEffect(() => {
        if(favoriteList.length === 0){
            axios.get(`${BASE_URL}/getFavorite`)
                .then(res => setFavoriteList(res.data.result))
                .catch(err => console.log(err))
        }
    },[favoriteList])
    
    return(
        <Fragment>
            <div className="header-container">
                <h1 className="header-title">Favoris</h1>
            </div>
            <div className="products_container">
                {favoriteList.map((favorite, i) => {
                    return(
                        <div key={i} className="product_item">
                            <NavLink to={`/collections/favoris/details/${favorite.id}`} className="product_link">
                            <img src={`${BASE_URL}/img/product/${favorite.picture}`} alt={`Première de couverture de ${favorite.title}`} className="product_img"/>
                            </NavLink>
                            <NavLink href={`/collections/favoris/details/${favorite.id}`}  className="product_link">
                            <p className="product_title">{favorite.title}</p>
                            </NavLink>
                            <p className="product_price">{favorite.price} €</p>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Favorite