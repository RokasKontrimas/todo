import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true, headers: {
        "Access-Control-Allow-Credentials": true,
    }
});

// Ensure CSRF cookie is set
export const getCsrfToken = async () => {
    try {
        const response = await instance.get('sanctum/csrf-cookie');
    } catch (error) {
    }
};


export default instance;
