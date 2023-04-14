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
            <div className="header-container">
                <h1 className="header-title">Josei</h1>
            </div>
            <div className="products_container">
                {joseiList.map((josei, i) => {
                    return(
                        <div key={i} className="product_item">
                            <NavLink to={`/collections/josei/details/${josei.id}`} className="product_link">
                            <img src={`${BASE_URL}/img/product/${josei.picture}`} alt={`Première de couverture de ${josei.title}`} className="product_img"/>
                            </NavLink>
                            <NavLink href={`/collections/josei/details/${josei.id}`} className="product_link">
                            <p className="product_title">{josei.title}</p>
                            </NavLink>
                            <p className="product_price">{josei.price} €</p>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Josei