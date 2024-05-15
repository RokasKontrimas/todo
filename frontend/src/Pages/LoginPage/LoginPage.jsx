import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import TextInputLabeled from '../../Components/Inputs/TextInputLabeled/TextInputLabeled.jsx';
import instance, {getCsrfToken} from '../../libs/axios/axios.js';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/AuthContext.jsx';
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {login, isLoggedIn} = useAuth();
    const {handleSubmit, setValue, clearErrors, setError, formState: {errors}} = useForm();
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);
    const onLoginSubmit = async (data) => {
        setLoading(true)
        try {
            await getCsrfToken();
            const res = await instance.post('api/login', data);
            if (res.status === 200 || res.status === 201) {
                login();
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                const serverErrors = err.response.data.errors;
                Object.keys(serverErrors).forEach((key) => {
                    setError(key, {message: serverErrors[key][0]});
                });
            } else if (err.response && err.response.data.message) {
                setError('login', {message: err.response.data.message});
            }
        }
    };

    return (
        <>
                <form onSubmit={handleSubmit(onLoginSubmit)}>
                    <TextInputLabeled
                        labelName='Email'
                        id='email'
                        type='email'
                        name='email'
                        setValue={setValue}
                        error={errors.email}
                    />
                    <TextInputLabeled
                        labelName='Password'
                        id='password'
                        type='password'
                        name='password'
                        setValue={setValue}
                        error={errors.password}
                    />
                    <button disabled={loading} type='submit'>Submit</button>
                </form>
        </>

    );
};

export default LoginPage;
