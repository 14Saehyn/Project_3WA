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
            <div className="header-container">
                <h1 className="header-title">Shonen</h1>
            </div>
            <div className="products_container">
                {shonenList.map((shonen, i) => {
                    return(
                        <div key={i} className="product_item">
                            <NavLink to={`/collections/shonen/details/${shonen.id}`} className="product_link">
                            <img src={`${BASE_URL}/img/product/${shonen.picture}`} alt={`Première de couverture de ${shonen.title}`} className="product_img"/>
                            </NavLink>
                            <NavLink to={`/collections/shonen/details/${shonen.id}`} className="product_link">
                            <p className="product_title">{shonen.title}</p>
                            </NavLink>
                            <p className="product_price">{shonen.price} €</p>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Shonen