import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Signup from "./components/Signup";
import Users from "./components/Users";
import EditUsers from "./components/EditUsers";
import UploadFile from "./components/UploadFile";
import AddProducts from "./components/AddProducts";
import Products from "./components/Products";
import EditProducts from "./components/EditProducts";
import ProductsUploadFile from "./components/ProductsUploadFile";
import Collections from "./components/Collections";
import Shonen from "./components/Shonen";
import Josei from "./components/Josei";
import Seinen from "./components/Seinen";
import Favoris from "./components/Favorite";
import ProductDetails from "./components/ProductDetails";
import PanelAdmin from "./components/PanelAdmin";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile.jsx";

function App() {
    return(
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/edit/:id" element={<EditUsers />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/avatar/:id" element={<UploadFile />} />
                <Route path="/addproducts" element={<AddProducts />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/edit/:id" element={<EditProducts />} />
                <Route path="/picture/:id" element={<ProductsUploadFile />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/shonen" element={<Shonen />} />
                <Route path="/collections/shonen/details/:id" element={<ProductDetails />} />
                <Route path="/collections/josei" element={<Josei />} />
                <Route path="/collections/josei/details/:id" element={<ProductDetails />} />
                <Route path="/collections/seinen" element={<Seinen />} />
                <Route path="/collections/seinen/details/:id" element={<ProductDetails />} />
                <Route path="/collections/favoris" element={<Favoris />} />
                <Route path="/collections/favoris/details/:id" element={<ProductDetails />} />
                <Route path="/admin" element={<PanelAdmin />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}
   
export default App;