import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment} from "react"
import {NavLink} from "react-router-dom"

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
                return(
                    <div key={i}>
                        <NavLink to={`/collections/josei/details/${josei.id}`}>
                        <img src={`${BASE_URL}/img/product/${josei.picture}`} alt={`Première de couverture de ${josei.title}`} width="175" height="263" border= "1px solid black"/>
                        </NavLink>
                        <NavLink href={`/collections/josei/details/${josei.id}`}>
                        <p>{josei.title}</p>
                        </NavLink>
                        <p>Prix : {josei.price} €</p>
                    </div>
                )
            })}
        </Fragment>
    )
}

export default Josei