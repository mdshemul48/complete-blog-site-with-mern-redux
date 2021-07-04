import React from 'react'
import { Helmet } from 'react-helmet'
const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 - Not Found</title>
            </Helmet>
            <div className="notFound">
                <div className="notFound__container">
                    <h1 className="notFound__container__h1">404</h1>
                    <p className="notFound__container__p">Oops! That Page Could Not Found</p>
                </div>

            </div>
        </>
    )
}

export default NotFound
