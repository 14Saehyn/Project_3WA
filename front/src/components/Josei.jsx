import axios from "axios"
import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment} from "react"

const Josei = () => {
    const [joseiList, setJoseiList] = useState([])
    
    useEffect(() => {
        if(joseiList.length === 0){
            axios.get(`${BASE_URL}/getJosei`)
                .then(res => setJoseiList(res.data.result))
                .catch(err => console.log(err))
        }
    },[joseiList])
    
    return(
        <Fragment>
            <h1>Notre collection "Josei"</h1>
            {joseiList.map((josei, i) => {
            console.log(josei.picture)
                return(
                    <ul key={i}>
                        <img src={`${BASE_URL}/img/product/${josei.picture}`} alt={`Première de couverture de ${josei.title}`} width="175" height="263" border= "1px solid black"/>
                        <li>Titre : {josei.title}</li>
                        <li>Auteur : {josei.author}</li>
                        <li>Prix : {josei.price} €</li>
                        <NavLink to={`/collections/josei/details/${josei.id}`}><button>Détails</button></NavLink>
                        <button>Ajouter au panier</button>
                    </ul>
                )
            })}
        </Fragment>
    )
}

export default Josei