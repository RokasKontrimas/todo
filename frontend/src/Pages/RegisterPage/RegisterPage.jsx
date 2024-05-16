import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import TextInputLabeled from '../../Components/Inputs/TextInputLabeled/TextInputLabeled.jsx';
import instance, {getCsrfToken} from '../../libs/axios/axios.js';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/AuthContext.jsx';

const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, watch, setValue,setError, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {login,setUser} = useAuth();
    const passwordValue = watch('Password');

    const fetchUser = async () => {
        try {
            const res = await instance.get('/api/user');
            setUser(res.data);
            const { token, user } = res.data;
            login(token, user);
            navigate('/');
        } catch (error) {
            setError('login', {message: "Failed to fetch user data"});
        } finally {
            setLoading(false);
        }
    };
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await getCsrfToken();
            const res = await instance.post('/api/register', {
                name: data.Name,
                email: data.Email,
                password: data.Password,
                password_confirmation: data.ConfirmPassword
            });
            if (res.status === 200 || res.status === 201) {
                await fetchUser()
            }
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputLabeled
                labelName="Name"
                id="name"
                name="Name"
                type="text"
                register={register}
                error={errors.Name}
                validationRules={{
                    required: "Name is required",
                    minLength: {value: 4, message: "Name must be at least 4 characters"},
                    maxLength: {value: 12, message: "Name cannot exceed 12 characters"}
                }}
                setValue={setValue}
            />
            <TextInputLabeled
                labelName="Email"
                id="email"
                name="Email"
                type="email"
                register={register}
                error={errors.Email}
                validationRules={{
                    required: "Email is required",
                    pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: "Invalid email address"},
                    minLength: {value: 4, message: "Email must be at least 4 characters"},
                    maxLength: {value: 64, message: "Email cannot exceed 64 characters"}
                }}
                setValue={setValue}
            />
            <TextInputLabeled
                labelName="Password"
                id="password"
                name="Password"
                type="password"
                register={register}
                error={errors.Password}
                validationRules={{
                    required: "Password is required",
                    minLength: {value: 8, message: "Password must be at least 8 characters"},
                    maxLength: {value: 24, message: "Password cannot exceed 24 characters"},
                    pattern: {
                        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
                        message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
                    }
                }}
                setValue={setValue}
            />
            <TextInputLabeled
                labelName="Confirm password"
                id="confirm-password"
                name="ConfirmPassword"
                type="password"
                register={register}
                error={errors.ConfirmPassword}
                validationRules={{
                    required: "Confirm password!",
                    validate: value => value === passwordValue || "Passwords do not match",
                }}
                setValue={setValue}
            />
            <button disabled={loading} type="submit">Sign up</button>
        </form>
    );
};

export default RegisterPage;
