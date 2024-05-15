import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/AuthContext.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";

const WelcomePage = () => {
    const {user, isLoading} = useAuth();


    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user, isLoading]);

    return (
        <div>
            {isLoading ? (<LoadingComponent/>) : (

                <p>Welcome, {user ? (user.name) : ('guest')}!</p>
            )}
        </div>
    );
};

export default WelcomePage;
