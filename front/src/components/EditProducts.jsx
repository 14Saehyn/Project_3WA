import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, Fragment} from "react"
import ProductsUploadFile from "./ProductsUploadFile.jsx"

const EditProducts = () => {
    const {id} = useParams();
    const [successMessage, setSuccessMessage] = useState(null)
    const [product, setProduct] = useState({
        title:"",
        categories_id: "",
        author: "",
        publisher: "",
        status: "",
        price: "",
        resume: ""
    });
    
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
    
    useEffect(() => {
        let timeout;
        if (successMessage) {
            timeout = setTimeout(() => {
                setSuccessMessage(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [successMessage, setSuccessMessage]);
    
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
                {successMessage && (
                    <p>{successMessage}</p>
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
                </form>
        </Fragment>
    )
}
    
export default EditProducts