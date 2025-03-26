import React from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {authenticated, loading} = useAuth();
    const navigate = useNavigate(); // Redirect after successful login

    if(loading) {
        return <div>Loading...</div>
    }
    if(authenticated){
        return children;
    }
    else{
        navigate('/login');
    }
}

export default PrivateRoute;