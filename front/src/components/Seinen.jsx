import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment} from "react"
import {NavLink} from "react-router-dom"

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
            <div className="header-container">
                <h1 className="header-title">Seinen</h1>
            </div>
            <div className="products_container">
                {seinenList.map((seinen, i) => {
                    return(
                        <div key={i} className="product_item">
                            <NavLink to={`/collections/seinen/details/${seinen.id}`} className="product_link">
                            <img src={`${BASE_URL}/img/product/${seinen.picture}`} alt={`Première de couverture de ${seinen.title}`} className="product_img"/>
                            </NavLink>
                            <NavLink to={`/collections/seinen/details/${seinen.id}`} className="product_link">
                            <p className="product_title">{seinen.title}</p>
                            </NavLink>
                            <p className="product_price">{seinen.price} €</p>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Seinen