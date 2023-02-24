import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, Fragment} from "react"

const AddProducts = () => {
    const [addProduct, setAddProduct] = useState({
        title: '',
        author: '',
        publisher: '',
        status: '',
        price: '',
        resume: ''
    })
    
    console.log(addProduct)
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setAddProduct({...addProduct, [name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData()
        const files = {...e.target.picture.files}
        
        console.log(files)
        
        /// D'autres input
        dataFile.append("title", addProduct.title)
        dataFile.append("author", addProduct.author)
        dataFile.append("publisher", addProduct.publisher)
        dataFile.append("status", addProduct.status)
        dataFile.append("price", addProduct.price)
        dataFile.append("resume", addProduct.resume)
        dataFile.append("categories_id", addProduct.categories_id)
        
        /// Input de l'image
        dataFile.append("files", files[0], files[0].name)
        
        
        
        axios.post(`${BASE_URL}/addProducts`, dataFile)
            .then((res) => {
                console.log(res)
                res.data.response && console.log("Téléchargement réussi");
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return(
        <Fragment>
            <form onSubmit={submit} encType="multipart/form-data">
                <input type="text" placeholder="Titre du produit" name="title" onChange={handleChange} value={addProduct.titre} />
                <select name="categories_id" onChange={handleChange} value={addProduct.categories_id}>
                    <option value="">Choisir un genre</option>
                    <option value="1">Aucun</option>
                    <option value="2">Shonen</option>
                    <option value="3">Josei</option>
                    <option value="4">Seinen</option>
                    <option value="5">Favoris</option>
                </select>
                <input type="text" placeholder="Auteur" name="author" onChange={handleChange} value={addProduct.author} />
                <select name="publisher" onChange={handleChange} value={addProduct.publisher}>
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
                <select name="status" onChange={handleChange} value={addProduct.status}>
                    <option>Choisir un statut</option>
                    <option>En stock</option>
                    <option>En rupture de stock</option>
                </select>
                <input type="number" placeholder="Prix du produit" name="price" onChange={handleChange} value={addProduct.price} />
                <textarea placeholder="Résumé du produit" name="resume" onChange={handleChange} value={addProduct.resume} />
                <p>Ajouter une image</p>
                <label name="picture">
                    <input type="file" name="picture"/>
                </label>
                <input type="submit" />
            </form>
        </Fragment>
    )
}

export default AddProducts;

