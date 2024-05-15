import './App.css'
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import {Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent.jsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.jsx";

function App() {
    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </>

    )
}

export default App
