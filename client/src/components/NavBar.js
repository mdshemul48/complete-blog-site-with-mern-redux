import React from 'react'
import { Link } from "react-router-dom"
const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar__left">
                        <Link to="/"><img src="/images/logo.png" alt="" /></Link>
                    </div>
                </div>
            </div>
            <div className="navbar__right">
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </div>
        </nav>
    )
}

export default NavBar
