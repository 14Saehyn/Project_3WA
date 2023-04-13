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
            <h1>Notre collection "Favoris"</h1>
            {favoriteList.map((favorite, i) => {
                return(
                    <div key={i}>
                        <NavLink to={`/collections/favoris/details/${favorite.id}`}>
                        <img src={`${BASE_URL}/img/product/${favorite.picture}`} alt={`Première de couverture de ${favorite.title}`} width="175" height="263" border= "1px solid black"/>
                        </NavLink>
                        <NavLink href={`/collections/favoris/details/${favorite.id}`}>
                        <p>{favorite.title}</p>
                        </NavLink>
                        <p>Prix : {favorite.price} €</p>
                    </div>
                )
            })}
        </Fragment>
    )
}

export default Favorite