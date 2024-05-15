import React, {useState} from 'react'
import TextInputLabeled from "../../Components/Inputs/TextInputLabeled/TextInputLabeled.jsx";
import instance from "../../libs/axios/axios.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/AuthContext.jsx";

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth()
    const registerSubmitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError('');

        instance.post('/api/register', {
            name,
            email,
            password,
            password_confirmation: confirmPassword
        }).then((res) => {
            login();
            navigate('/');
        }).catch((err) => {
        });
    };

    return (
        <form onSubmit={(e) => registerSubmitHandler(e)}>
            <TextInputLabeled
                labelName="Name"
                id='name'
                name='name'
                type='text'
                stateValue={name}
                onStateChange={setName}
            />
            <TextInputLabeled
                labelName="Email"
                id='email'
                name='email'
                type='email'
                stateValue={email}
                onStateChange={setEmail}
            />
            <TextInputLabeled
                labelName="Password"
                id='password'
                name='password'
                type='password'
                stateValue={password}
                onStateChange={setPassword}
            />
            <TextInputLabeled
                labelName="Confirm password"
                id='confirm-password'
                name='confirm-password'
                type='password'
                stateValue={confirmPassword}
                onStateChange={setConfirmPassword}
                error={error}
            />
            <button type='submit'>Register</button>
        </form>
    )
}
export default RegisterPage
