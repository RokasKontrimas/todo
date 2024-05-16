import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent.jsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.jsx";
import ProtectedRoutes from "./Components/ProtectedRoute/ProtectedRoutes.jsx";
import {useAuth} from "./hooks/AuthContext.jsx";

function App() {
    const {isLoggedIn} = useAuth()
    return (
        <div>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                {/*<Route element={<ProtectedRoutes auth={isLoggedIn}/>}>*/}
                    <Route path='/login' element={isLoggedIn ? (<Navigate to='/' state={{ message: {warning: "Already logged in!"} }}/>) : (<LoginPage/>)}/>
                    <Route path='/register' element={isLoggedIn ? (<Navigate to='/' state={{ message: {warning: "Already logged in!"} }}/>) : (<RegisterPage/>)}/>
                {/*</Route>*/}
            </Routes>
        </div>

    )
}

export default App
