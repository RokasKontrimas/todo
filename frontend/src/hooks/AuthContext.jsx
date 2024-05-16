import React, {createContext, useContext, useState, useEffect} from 'react';
import instance from "../libs/axios/axios.js";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem('isLoggedIn'))
    });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const token = Cookies.get('auth_token');

        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await instance.get('/api/user', {
                        headers: {Authorization: `Bearer ${token}`}
                    });
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
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (token, user) => {
        Cookies.set('auth_token', token, {expires: 1, secure: true, sameSite: 'Strict'});
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        setUser(user);
    };

    const logout = () => {
        Cookies.remove('auth_token');
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, user, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
