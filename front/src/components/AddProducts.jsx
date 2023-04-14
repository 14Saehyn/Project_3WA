import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, Fragment, useEffect} from "react"

const AddProducts = () => {
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [addProduct, setAddProduct] = useState({
        title: '',
        author: '',
        publisher: '',
        status: '',
        price: '',
        resume: ''
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setAddProduct({...addProduct, [name]:value})
    }
    
    useEffect(() => {
        let timeout;
        if (isProductAdded) {
            timeout = setTimeout(() => {
                setIsProductAdded(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isProductAdded, setIsProductAdded]);
    
    const submit = (e) => {
        e.preventDefault()
         if (!addProduct.title ||
         !addProduct.categories_id ||
         !addProduct.author ||
         !addProduct.publisher ||
         !addProduct.status ||
         !addProduct.price ||
         !addProduct.resume ||
         !e.target.cover.files[0]) {
            alert('Veuillez remplir tous les champs.')
            return
        }
        const dataFile = new FormData()
        const files = {...e.target.cover.files}
        
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
                res.data.response && setIsProductAdded(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return(
        <Fragment>
            <div className="header-container">
                <h1 className="header-title">Panel admin</h1>
            </div>
            <div className="content-wrapper_header">
                {isProductAdded &&
                    <p className="success-message profile-message">Le produit a été créé avec succès !</p>
                }
                <form onSubmit={submit} encType="multipart/form-data">
                    <h2 className="title_h2">Ajouter les informations</h2>
                    <input type="text" placeholder="Titre" name="title" onChange={handleChange} value={addProduct.titre} />
                    <input type="text" placeholder="Auteur" name="author" onChange={handleChange} value={addProduct.author} />
                    <input type="number" placeholder="Prix" name="price" onChange={handleChange} value={addProduct.price} />
                    <textarea placeholder="Résumé" name="resume" onChange={handleChange} value={addProduct.resume} />
                    <div className="select-space">
                        <select name="categories_id" onChange={handleChange} value={addProduct.categories_id}>
                            <option value="">Choisir un genre</option>
                            <option value="1">Aucun</option>
                            <option value="2">Shonen</option>
                            <option value="3">Josei</option>
                            <option value="4">Seinen</option>
                            <option value="5">Favoris</option>
                        </select>
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
                            <option value="">Choisir un statut</option>
                            <option>En stock</option>
                            <option>En rupture de stock</option>
                        </select>
                    </div>
                    <div className="user-infos-container">
                        <h2 className="title_h2">Ajouter une couverture</h2>
                        <input className="file-chosen" type='file' name='cover'/>
                        <input type='submit' value='Modifier' className="text-input"/>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default AddProducts;