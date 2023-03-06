import express from "express";
import testController from "../controllers/testController.js";
import GetUsers from "../controllers/getUsers.js";
import Signup from "../controllers/signup.js";
import GetUsersById from "../controllers/getUsersById.js";
import EditUsersById from "../controllers/editUsersById.js";
import DeleteUsersById from "../controllers/deleteUsersById.js";
import middlewareUploadFile from "../controllers/middlewareUploadFile.js";
import UploadFile from "../controllers/uploadFile.js";
import AddProducts from "../controllers/addProducts.js";
import GetProducts from "../controllers/getProducts.js";
import middlewareProductUploadFile from "../controllers/middlewareProductUploadFile.js"
import GetProductsById from "../controllers/getProductsById.js";
import EditProductsById from "../controllers/editProductsById.js";
import ProductsUploadFile from "../controllers/productsUploadFile.js";
import DeleteProductsById from "../controllers/deleteProductsById.js";
import GetShonen from "../controllers/getShonen.js";
import GetJosei from "../controllers/getJosei.js";
import GetSeinen from "../controllers/getSeinen.js";
import GetFavorite from "../controllers/getFavorite.js";
import Login from "../controllers/login.js";
import checkToken from '../controllers/checkToken.js';
import middleware from "../controllers/middleware.js";
import AddReviews from "../controllers/addReviews.js";
import ReviewsByProductsId from "../controllers/reviewsByProductsId.js";
import GetReviews from "../controllers/getReviews.js";
import DeleteReviewsById from "../controllers/deleteReviewsById.js";
import ReviewsByUsersId from "../controllers/reviewsByUsersId.js";
import Contact from "../controllers/contact.js";
import AddToCart from "../controllers/addToCart.js";
import GetCart from "../controllers/getCart.js";
import DeleteCartProducts from "../controllers/deleteCartProducts.js";
import DeleteCart from "../controllers/deleteCart.js";
import GetContact from "../controllers/getContact.js";
import DeleteContactById from "../controllers/deleteContactById.js";

const router = express.Router();

const routesGET = [
    {route: "/", controller: testController},
    {route: "/getUsers", controller: GetUsers},
    {route: "/getProducts", controller: GetProducts},
    {route: "/getShonen", controller: GetShonen},
    {route: "/getJosei", controller: GetJosei},
    {route: "/getSeinen", controller: GetSeinen},
    {route: "/getFavorite", controller: GetFavorite},
    {route: "/getReviews", controller: GetReviews},
    {route: "/getContact", controller: GetContact}
]

const routesPOST = [
    {route: "/signup", controller: Signup},
    {route: "/getUsersById", controller: GetUsersById},
    {route: "/editUsersById", controller: EditUsersById},
    {route: "/deleteUsersById", controller: DeleteUsersById},
    {route: "/getProductsById", controller: GetProductsById},
    {route: "/editProductsById", controller: EditProductsById},
    {route: "/deleteProductsById", controller: DeleteProductsById},
    {route: "/getReviewsByProductsId", controller: ReviewsByProductsId},
    {route: "/getReviewsByUsersId", controller: ReviewsByUsersId},
    {route: "/login", controller: Login},
    {route: "/addReviews", controller: AddReviews},
    {route: "/deleteReviewsById", controller: DeleteReviewsById},
    {route: "/addToCart", controller: AddToCart},
    {route: "/getCart", controller: GetCart},
    {route: "/deleteCartProducts", controller: DeleteCartProducts},
    {route: "/deleteCart", controller: DeleteCart},
    {route: "/contact", controller: Contact},
    {route: "/deleteContactById", controller: DeleteContactById}
]

router.post("/uploadFile", middlewareUploadFile, middleware, UploadFile)
router.post("/addProducts", middlewareProductUploadFile, middleware, AddProducts)
router.post("/productsUploadFile", middlewareProductUploadFile, middleware, ProductsUploadFile)

routesGET.map((item) => {
    router.get(item.route, middleware, item.controller);
})

routesPOST.map((item) => {
    router.post(item.route, middleware, item.controller);
})

router.get("/relogged", checkToken)

export default router;