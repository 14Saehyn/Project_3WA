import Router from "./components/Router.jsx"
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Router />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
