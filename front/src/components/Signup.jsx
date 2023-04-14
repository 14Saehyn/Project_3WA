import axios from "axios";
import { BASE_URL } from "../tools/constante.js";
import { useState, Fragment, useEffect } from "react";

const Signup = () => {
    const [errors, setErrors] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null)
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
    
    useEffect(() => {
        let timeout;
        if (successMessage) {
            timeout = setTimeout(() => {
                setSuccessMessage(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [successMessage, setSuccessMessage]);

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
                setSuccessMessage("Inscription réussie !");
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
            <div className="header-container">
                <h1 className="header-title">Inscription</h1>
            </div>
            <Fragment>
                <div className="content-wrapper_header">
                    {addUser && successMessage &&
                        <p className="success-message profile-message">{successMessage}</p>
                    }
                    {errors.map((error, index) => (
                        <span key={index} className="delete-message profile-message">
                            {error}
                            <br />
                        </span>
                    ))}
                    <form onSubmit={submit}>
                        <input type="text" placeholder="Votre prénom" name="first_name" onChange={handleChange} value={userData.first_name} />
                        <input type="text" placeholder="Votre nom" name="last_name" onChange={handleChange} value={userData.last_name} />
                        <input type="email" placeholder="Votre email" name="email" onChange={handleChange} value={userData.email} />
                        <input type="password" placeholder="Votre mot de passe" name="password" onChange={handleChange} value={userData.password} />
                        <div className="user-buttons-container">
                            <input type='submit' value="S'inscrire" className="text-input"/>
                        </div>
                    </form>
                </div>
            </Fragment>
        </Fragment>
    );
};

export default Signup