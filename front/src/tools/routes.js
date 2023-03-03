import Home from "../components/Home.jsx";
import Error404 from "../components/Error404.jsx";
import Signup from "../components/Signup.jsx";
import Users from "../components/Users.jsx";
import EditUsers from "../components/EditUsers.jsx";
import UploadFile from "../components/UploadFile.jsx";
import AddProducts from "../components/AddProducts.jsx";
import Products from "../components/Products.jsx";
import EditProducts from "../components/EditProducts.jsx";
import ProductsUploadFile from "../components/ProductsUploadFile.jsx";
import Collections from "../components/Collections.jsx";
import Shonen from "../components/Shonen.jsx";
import Josei from "../components/Josei.jsx";
import Seinen from "../components/Seinen.jsx";
import Favoris from "../components/Favorite.jsx";
import ProductDetails from "../components/ProductDetails.jsx";
import Login from "../components/Login.jsx";
import UserProfile from "../components/UserProfile.jsx";
import Logout from "../components/Logout.jsx";
import Bio from "../components/Bio.jsx";
import Contact from "../components/Contact.jsx";
import Cart from "../components/Cart.jsx";
import LegalNotice from "../components/LegalNotice.jsx";
import AddReviews from "../components/AddReviews.jsx";
import ReviewsProducts from "../components/ReviewsByProducts.jsx";
import Reviews from "../components/Reviews.jsx";
import ReviewsUsers from "../components/ReviewsByUsers.jsx";

const routes = [
    {path:"/", component:<Home />},
    {path:"/signup", component:<Signup />},
    {path:"/login", component:<Login />},
    {path:"/users", component:<Users />, auth:"admin"},
    {path:"/users/edit/:id", component:<EditUsers />, auth:"admin"},
    {path:"/profile/:id", component:<UserProfile />},
    {path:"/avatar/:id", component:<UploadFile />},
    {path:"/addproducts", component:<AddProducts />, auth:"admin"},
    {path:"/products", component:<Products />, auth:"admin"},
    {path:"/products/edit/:id", component:<EditProducts />, auth:"admin"},
    {path:"/picture/:id", component:<ProductsUploadFile />, auth:"admin"},
    {path:"/collections", component:<Collections />},
    {path:"/collections/shonen", component:<Shonen />},
    {path:"/collections/shonen/details/:id", component:<ProductDetails />},
    {path:"/collections/josei", component:<Josei />},
    {path:"/collections/josei/details/:id", component:<ProductDetails />},
    {path:"/collections/seinen", component:<Seinen />},
    {path:"/collections/seinen/details/:id", component:<ProductDetails />},
    {path:"/collections/favoris", component:<Favoris />},
    {path:"/collections/favoris/details/:id", component:<ProductDetails />},
    {path:"/reviews", component:<Reviews />},
    {path:"/reviews/:users_id", component:<ReviewsUsers />},
    {path:"/details/reviews/:products_id", component:<ReviewsProducts />},
    {path:"/logout", component:<Logout />},
    {path:"/bio", component:<Bio />},
    {path:"/contact", component:<Contact />},
    {path:"/cart", component:<Cart />},
    {path:"/legalnotice", component:<LegalNotice />},
    {path:"/addreviews/:products_id", component:<AddReviews />},
    
    {path:"*", component:<Error404 />}
]

export default routes