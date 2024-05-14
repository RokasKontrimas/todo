import React from 'react'
import {NavLink} from "react-router-dom";
import {useAuth} from "../../hooks/AuthContext.jsx";
import instance from "../../libs/axios/axios.js";

const HeaderComponent = () => {
    const {isLoggedIn, logout} = useAuth()
    const handleLogOut = (e) => {
        e.preventDefault()
        try {
            instance.post('api/logout').then((res) => {
                logout()
            })
        } catch (e) {

        }
    }
    return (
        <header>
            <div>
                {/*<div className={styles.navWrapper}>*/}
                <nav>
                    <ul>
                        {!isLoggedIn ? (
                            <>
                                <li><NavLink to='/login'>Login</NavLink></li>
                                <li><NavLink to='/register'>Register</NavLink></li>
                            </>
                        ) : (
                            <li>
                                <button onClick={(e) => {
                                    handleLogOut(e)
                                }}>Log out
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default HeaderComponent
