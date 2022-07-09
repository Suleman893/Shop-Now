import React from "react";
import {Navigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = ({ isAdmin,children}) => {
   
    const { currentUser,loggedInUserInfo} = useSelector((state) => state.loginUser);

    if(!currentUser)
    {
        console.log('No :(');
     return <Navigate to={"/signin"}/>
    }

    if(isAdmin && loggedInUserInfo.role !== "admin") 
    {
        return <Navigate to={"/signin"}/> 
    }
    return children
};

export default ProtectedRoute;
