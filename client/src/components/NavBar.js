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
        </nav>
    )
}

export default NavBar
