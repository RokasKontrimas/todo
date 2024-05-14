import { useAuth } from './AuthContext.jsx';

export const useLoggedIn = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn;
};