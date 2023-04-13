import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment} from "react"
import {NavLink} from "react-router-dom"

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
                return(
                    <div key={i}>
                        <NavLink to={`/collections/shonen/details/${shonen.id}`}>
                        <img src={`${BASE_URL}/img/product/${shonen.picture}`} alt={`Première de couverture de ${shonen.title}`} width="175" height="263" border= "1px solid black"/>
                        </NavLink>
                        <NavLink to={`/collections/shonen/details/${shonen.id}`}>
                        <p>{shonen.title}</p>
                        </NavLink>
                        <p>Prix : {shonen.price} €</p>
                    </div>
                )
            })}
        </Fragment>
    )
}

export default Shonen