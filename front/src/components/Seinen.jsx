import axios from "axios"
import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment} from "react"

const Seinen = () => {
    const [seinenList, setSeinenList] = useState([])
    
    useEffect(() => {
        if(seinenList.length === 0){
            axios.get(`${BASE_URL}/getSeinen`)
                .then(res => setSeinenList(res.data.result))
                .catch(err => console.log(err))
        }
    },[seinenList])
    
    return(
        <Fragment>
            <h1>Notre collection "Seinen"</h1>
            {seinenList.map((seinen, i) => {
            console.log(seinen.picture)
                return(
                    <ul key={i}>
                        <img src={`${BASE_URL}/img/product/${seinen.picture}`} alt={`Première de couverture de ${seinen.title}`} width="175" height="263" border= "1px solid black"/>
                        <li>Titre : {seinen.title}</li>
                        <li>Auteur : {seinen.author}</li>
                        <li>Prix : {seinen.price} €</li>
                        <NavLink to={`/collections/josei/details/${seinen.id}`}><button>Détails</button></NavLink>
                        <button>Ajouter au panier</button>
                    </ul>
                )
            })}
        </Fragment>
    )
}

export default Seinen