import axios from "axios"
import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment} from "react"

const Shonen = () => {
    const [shonenList, setShonenList] = useState([])
    
    useEffect(() => {
        if(shonenList.length === 0){
            axios.get(`${BASE_URL}/getShonen`)
                .then(res => setShonenList(res.data.result))
                .catch(err => console.log(err))
        }
    },[shonenList])

    return(
        <Fragment>
            <h1>Notre collection "Shonen"</h1>
            {shonenList.map((shonen, i) => {
            console.log(shonen.picture)
                return(
                    <ul key={i}>
                        <img src={`${BASE_URL}/img/product/${shonen.picture}`} alt={`Première de couverture de ${shonen.title}`} width="175" height="263" border= "1px solid black"/>
                        <li>Titre : {shonen.title}</li>
                        <li>Auteur : {shonen.author}</li>
                        <li>Prix : {shonen.price} €</li>
                        <NavLink to={`/collections/shonen/details/${shonen.id}`}><button>Détails</button></NavLink>
                        <button>Ajouter au panier</button>
                    </ul>
                )
            })}
        </Fragment>
    )
}

export default Shonen