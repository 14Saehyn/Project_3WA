import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Signup from "./components/Signup";
import Users from "./components/Users";
import EditUsers from "./components/EditUsers";
import StoreProvider from "./components/StoreProvider"
import {reducer} from "./tools/reducer.js"
import {initialState} from "./tools/context.js"
import UploadFile from "./components/UploadFile"

function App() {
    return(
        <StoreProvider initialState={initialState} reducer={reducer}>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/edit/:id" element={<EditUsers />} />
                    <Route path="/storeprovider" element={<StoreProvider />} />
                    <Route path="/avatar/:id" element={<UploadFile />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    )
}
   
export default App;
