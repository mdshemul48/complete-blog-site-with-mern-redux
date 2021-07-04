import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { Toaster, toast } from "react-hot-toast"
import BgImage from './BgImage'
import { postLogin } from '../../store/asyncMethods/LoginMethods'


const Login = () => {
    const dispatch = useDispatch()
    const { loginError } = useSelector(state => state.AuthReducer)
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const inputHandler = (event) => {
        const { name, value } = event.target
        console.log(name, value)
        setInput((prevState) => {
            return { ...prevState, [name]: value }
        })
    }
    const loginHandler = (event) => {
        event.preventDefault()

        dispatch(postLogin(input))
    }

    useEffect(() => {
        loginError.map((error) => toast.error(error.msg))
    }, [loginError])

    return (
        <>
            <Helmet>
                <title>User Login</title>
                <meta name="description" content="User login form" />
            </Helmet>
            <Toaster position="top-right"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    style: {
                        fontSize: "15px"

                    }
                }} />
            <div className="row mt-80">
                <div className="col-8">
                    <BgImage />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={loginHandler} >
                                <div className="group">
                                    <h3 className="form-heading">Login</h3>
                                </div>
                                <div className="group">
                                    <input type="email" name="email" className="group__control" placeholder="Enter Email" onChange={inputHandler} />
                                </div>
                                <div className="group">
                                    <input type="password" name="password" className="group__control" placeholder="Create Password" onChange={inputHandler} />
                                </div>
                                <div className="group">
                                    <input type="submit" className="btn btn-default btn-block" value="Login" />

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
