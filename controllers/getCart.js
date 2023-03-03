import {asyncQuery} from "../config/database.js";

export default async (req, res) => {
    const {cart_id} = req.body 
    
    // on recupere l'id des produits qui ce trouve dans le panier de l'utilisataeur 
    const sql = "SELECT products_id FROM products_cart WHERE cart_id = ?"
    const paramsSql = [cart_id]
    const cart = await asyncQuery(sql, paramsSql)
    
    // on recupere la liste de tout les produit 
    const productSql = "SELECT * FROM products"
    const product = await asyncQuery(productSql, [])
    
    // on extrait les id des produit pour les mettre dans un tableau
    const idProduct = []
    
    cart.forEach((e) => {
        idProduct.push(e.products_id)
    })    
    
    // on filtre les produit pour ne garder que ce qui son dans le panier de notre utilisateur
    const cartProduct = product.filter(e => idProduct.includes(e.id))
    
    // on retourn le panier des produit 
    const result = {cartProduct}
    
    res.json({result})
}