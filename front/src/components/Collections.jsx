import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {Fragment} from "react"
/*import {StoreContext} from "../tools/context.js";*/
/*import axios from "axios";*/

const Collections = () => {
    /*const [state, dispatch] = React.useContext(StoreContext);
    
    useEffect(() => {
        if(state.user.cart_id && state.cart.length === 0){
            axios.post(`${BASE_URL}/getCart`, {cart_id: state.user.cart_id})
            .then(res => {
                // on met le panier dans le Reducer
                dispatch({
                    type:"ADD_CART", payload:res.data.result.cartProduct[0]
                })
            })
            .catch(e => console.log(e))
        }
    },[state.user.cart_id])*/
    
    return ( 
        <Fragment>
            <h1>Nos collections</h1>
                <h2>
                    <NavLink to="/collections/shonen">
                    <img src={`${BASE_URL}/img/product/banners/shonen.jpg`} alt="Shonen" width="333" height="100"/>
                    </NavLink>
                </h2>
                <p>Le shonen est un genre populaire de mangas japonais qui s'adresse principalement à un public de jeunes garçons. Les histoires shonen mettent souvent en scène des héros adolescents courageux qui se battent pour des causes justes et qui surmontent des défis incroyables. Les thèmes récurrents incluent l'amitié, la loyauté, la persévérance, l'aventure, l'action et le combat.</p>
                <h2>
                    <NavLink to="/collections/josei">
                    <img src={`${BASE_URL}/img/product/banners/josei.jpg`} alt="Josei" width="333" height="100"/>
                    </NavLink>
                </h2>
                <p>Le Josei est un genre de manga japonais qui cible principalement un public de jeunes femmes adultes. Les histoires Josei explorent souvent des thèmes plus matures et complexes tels que la romance, les relations humaines, la vie professionnelle et la quête d'identité personnelle.</p>
                <h2>
                    <NavLink to="/collections/seinen">
                    <img src={`${BASE_URL}/img/product/banners/seinen.jpg`} alt="Seinen" width="333" height="100"/>
                    </NavLink>
                </h2>
                <p>Le Seinen est un genre de manga japonais qui cible principalement un public de jeunes adultes, en particulier les hommes. Les histoires Seinen explorent souvent des thèmes matures et complexes tels que la violence, la sexualité, la psychologie humaine, la politique, l'histoire et la philosophie.</p>
                <h2>
                    <NavLink to="/collections/favoris">
                    <img src={`${BASE_URL}/img/product/banners/favoris.jpg`} alt="Favoris" width="333" height="100"/>
                    </NavLink>
                </h2>
                <p>La catégorie "Favoris" est une sélection de mangas que nous avons particulièrement aimés et que nous recommandons vivement. Ces œuvres ont été choisies pour leur qualité exceptionnelle, leur intrigue captivante, leurs personnages mémorables et leur exécution artistique.</p>
        </Fragment>
    )
}

export default Collections