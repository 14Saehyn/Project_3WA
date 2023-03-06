import axios from "axios"
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
                return(
                    <ul key={i}>
                        <a href={`/collections/seinen/details/${seinen.id}`}>
                        <img src={`${BASE_URL}/img/product/${seinen.picture}`} alt={`Première de couverture de ${seinen.title}`} width="175" height="263" border= "1px solid black"/>
                        </a>
                        <a href={`/collections/seinen/details/${seinen.id}`}>
                        <p>{seinen.title}</p>
                        </a>
                        <p>Prix : {seinen.price} €</p>
                    </ul>
                )
            })}
        </Fragment>
    )
}

export default Seinen