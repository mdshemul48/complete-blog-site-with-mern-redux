import React, { useState } from 'react'
import { Helmet } from "react-helmet"
import BgImage from './BgImage'
const Register = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
    })

    const inputHandler = event => {
        setFormState((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }

    const registerSubmitHandler = (event) => {
        event.preventDefault()

        console.log(formState)


    }

    return (
        <>
            <Helmet>
                <title>User Register</title>
                <meta name="description" content="User Register form" />
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <BgImage />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={registerSubmitHandler}>
                                <div className="group">
                                    <h3 className="form-heading">Register</h3>
                                </div>
                                <div className="group">
                                    <input type="text" name="name" value={formState.name} className="group__control" placeholder="Enter Name" onChange={inputHandler} />
                                </div>
                                <div className="group">
                                    <input type="email" name="email" value={formState.email} className="group__control" placeholder="Enter Email" onChange={inputHandler} />
                                </div>
                                <div className="group">
                                    <input type="password" name="password" value={formState.password} className="group__control" placeholder="Create Password" onChange={inputHandler} />
                                </div>
                                <div className="group">
                                    <input type="submit" className="btn btn-default btn-block" value="Register" />

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
