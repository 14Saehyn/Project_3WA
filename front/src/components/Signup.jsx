import axios from "axios";
import { BASE_URL } from "../tools/constante.js";
import { useState, Fragment } from "react";

const Signup = () => {
    const [errors, setErrors] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(`${BASE_URL}/signup`, {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                password: userData.password
            })
            .then((res) => {
                res.data.response && setAddUser(true);
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.data.errors) {
                    console.error("Error messages received:", err.response.data.errors);
                    setErrors(err.response.data.errors);
                    setTimeout(() => {
                        setErrors([]);
                    }, 5000);
                }
            });
    };

    return (
        <Fragment>
            {addUser && 
                <span>Félicitations, bienvenue chez Fureneshi !</span>
            }
            {errors.map((error, index) => (
                <span key={index}>
                    {error}
                    <br />
                </span>
            ))}
            <form onSubmit={submit}>
                <input type="text" placeholder="Votre prénom" name="first_name" onChange={handleChange} value={userData.first_name} />
                <input type="text" placeholder="Votre nom" name="last_name" onChange={handleChange} value={userData.last_name} />
                <input type="email" placeholder="Votre email" name="email" onChange={handleChange} value={userData.email} />
                <input type="password" placeholder="Votre mot de passe" name="password" onChange={handleChange} value={userData.password} />
                <input type="submit" />
            </form>
        </Fragment>
    );
};

export default Signup