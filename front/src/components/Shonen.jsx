import axios from "axios"
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
                return(
                    <ul key={i}>
                        <a href={`/collections/shonen/details/${shonen.id}`}>
                        <img src={`${BASE_URL}/img/product/${shonen.picture}`} alt={`Première de couverture de ${shonen.title}`} width="175" height="263" border= "1px solid black"/>
                        </a>
                        <a href={`/collections/shonen/details/${shonen.id}`}>
                        <p>{shonen.title}</p>
                        </a>
                        <p>Prix : {shonen.price} €</p>
                    </ul>
                )
            })}
        </Fragment>
    )
}

export default Shonen