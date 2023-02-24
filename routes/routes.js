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

const router = express.Router();

/* Routes GET */
router.get("/", testController)
router.get("/getUsers", GetUsers)
router.get("/getProducts", GetProducts)
router.get("/getShonen", GetShonen)
router.get("/getJosei", GetJosei)
router.get("/getSeinen", GetSeinen)
router.get("/getFavorite", GetFavorite)

/* Routes POST */
router.post("/signup", Signup)
router.post("/getUsersById", GetUsersById)
router.post("/editUsersById", EditUsersById)
router.post("/deleteUsersById", DeleteUsersById)
router.post("/uploadFile", middlewareUploadFile, UploadFile)
router.post("/addProducts", middlewareProductUploadFile, AddProducts)
router.post("/getProductsById", GetProductsById)
router.post("/editProductsById", EditProductsById)
router.post("/productsUploadFile", middlewareProductUploadFile, ProductsUploadFile)
router.post("/deleteProductsById", DeleteProductsById)
router.post("/login", Login)

export default router;