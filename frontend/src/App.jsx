import './App.css'
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import {Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent.jsx";

function App() {
    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </>

    )
}

export default App
