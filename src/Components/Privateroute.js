import React,{useContext} from 'react';
import { redirect } from "react-router-dom";
import {Route} from 'react-router-dom';
import { AuthContext } from '../Context/Authcontext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const {user} = useContext(AuthContext) 
    return user ? <>{children}</> : <Navigate to="/login" />
    
}

export default PrivateRoute