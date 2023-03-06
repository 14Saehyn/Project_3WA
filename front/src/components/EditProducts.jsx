import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, Fragment, useReducer} from "react"
import {initialState} from "../tools/context.js"
import {reducer} from "../tools/reducer.js"
import ConfirmationModal from "./ConfirmationModal.jsx"
import ProductsUploadFile from "./ProductsUploadFile.jsx"

const EditProducts = () => {
    const {id} = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [product, setProduct] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsById`, {id})
            .then(res => {
                const data = res.data.result[0]
                setProduct(data)
            })
            .catch(err => console.log(err))
    }, [id])
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }
    
    const openModal = (id) => {
        dispatch({type: 'openModal', payload: id})
    }
    
    const deleteProduct = (id) => {
        axios.post(`${BASE_URL}/deleteProductsById`, {id})
        .then(res => {
            setIsDeleted(true);
            setIsDeleting(false);
            dispatch({type: 'confirmModal'});
        })
        .catch(err => console.log(err))
    }
    
    const closeModal = () => {
        dispatch({type: 'closeModal'});
    }
    
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/editProductsById`, {...product})
        .then(res => {
            setSuccessMessage("Informations modifiées avec succès !");
        })
        .catch(err => console.log(err))
    }
    
    return (
        <Fragment>
            <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteProduct(state.payload)} onCancel={closeModal}/>
            {product && (
                <Fragment>
                    {!isDeleting && successMessage && !isDeleted && (
                        <p>{successMessage}</p>
                    )}
                    {isDeleted && (
                        <p>Suppression effectuée avec succès !</p>
                    )}
                    <ProductsUploadFile />
                    <h1>Modifier les informations</h1>
                    <form onSubmit={submit}>
                        <input type="text" name="title" onChange={handleChange} value={product.title} />
                        <select name="categories_id" onChange={handleChange} value={product.categories_id}>
                            <option value="">Choisir un genre</option>
                            <option value="1">Aucun</option>
                            <option value="2">Shonen</option>
                            <option value="3">Josei</option>
                            <option value="4">Seinen</option>
                            <option value="5">Favoris</option>
                        </select>
                        <input type="text" name="author" onChange={handleChange} value={product.author} />
                        <select name="publisher" onChange={handleChange} value={product.publisher}>
                            <option value="">Choisir un éditeur</option>
                            <option>Panini</option>
                            <option>Mangetsu</option>
                            <option>Soleil</option>
                            <option>Glénat</option>
                            <option>Ki-oon</option>
                            <option>Ankama</option>
                            <option>Pika</option>
                            <option>Kazé (Crunchyroll)</option>
                            <option>Kana</option>
                            <option>Kurokawa</option>
                            <option>Delcourt / Tonkam</option>
                            <option>Soleil</option>
                        </select>
                        <select name="status" onChange={handleChange} value={product.status}>
                            <option value="">Choisir un statut</option>
                            <option>En stock</option>
                            <option>Rupture de stock</option>
                        </select>
                        <input type="number" name="price" onChange={handleChange} value={product.price} />
                        <textarea name="resume" onChange={handleChange} value={product.resume} />
                        <input type='submit' />
                        <button onClick = {() => {
                        setIsDeleting(true);
                        openModal(product.id)}}>Supprimer</button>
                    </form>
                </Fragment>
            )}
        </Fragment>
    )
}
    
export default EditProducts