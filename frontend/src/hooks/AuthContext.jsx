import React, {createContext, useContext, useState, useEffect} from 'react';
import instance from "../libs/axios/axios.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await instance.get('/api/user');
                setUser(response.data);
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false)
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, user,setUser, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};
