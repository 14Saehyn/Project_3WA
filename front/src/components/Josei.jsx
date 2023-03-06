import axios from "axios"
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
                return(
                    <ul key={i}>
                        <a href={`/collections/josei/details/${josei.id}`}>
                        <img src={`${BASE_URL}/img/product/${josei.picture}`} alt={`Première de couverture de ${josei.title}`} width="175" height="263" border= "1px solid black"/>
                        </a>
                        <a href={`/collections/josei/details/${josei.id}`}>
                        <p>{josei.title}</p>
                        </a>
                        <p>Prix : {josei.price} €</p>
                    </ul>
                )
            })}
        </Fragment>
    )
}

export default Josei