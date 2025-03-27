import { useEffect, useState, useContext, createContext } from "react";
import { is_authenticated, login, register } from "../endpoints/api";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Use react-router location

    const get_authenticated = async () => {
        try {
            const response = await is_authenticated();
            setAuthenticated(response);
        } catch (error) {
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const get_user = async (username, password) => {
        const success = await login(username, password);
        if (success) {
            setAuthenticated(true);
            navigate("/");
        }
    };

    const get_register = async (username, password, cpassword, email, firstname, lastname) => {
        if (password !== cpassword) {
            alert("Passwords do not match");
        } else {
            try {
                const success = await register(username, password, email, firstname, lastname);
                console.log(success);
                alert("Registration Successful");
            } catch (err) {
                alert("Registration Failed");
            }
        }
    };

    useEffect(() => {
        get_authenticated();
    }, [location.pathname]); // ✅ Runs whenever the route changes

    return (
        <AuthContext.Provider value={{ authenticated, loading, get_user, get_register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
