import React, {useState, useEffect} from 'react';
import instance, {getCsrfToken} from "../../libs/axios/axios.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/AuthContext.jsx";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [csrfLoaded, setCsrfLoaded] = useState(false);
    const navigate = useNavigate()
    const {login} = useAuth();
    useEffect(() => {
        // Ensure CSRF token is set before any request
        const loadCsrfToken = async () => {
            await getCsrfToken();
            setCsrfLoaded(true);
        };
        loadCsrfToken();
    }, []);
    const onLoginSubmit = async (e) => {
        e.preventDefault();

        if (!csrfLoaded) {
            return;
        }
        try {
            const response = await instance.post('api/login', {email, password});
            login()
            navigate('/')
        } catch (err) {
            console.error('Login error', err);
        }
    };

    return (
        <form onSubmit={onLoginSubmit}>
            <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    );
};
export default LoginPage;
