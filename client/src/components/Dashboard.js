import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { useSelector, useDispatch } from "react-redux"
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../store/types/PostTypes'
import { Toaster, toast } from "react-hot-toast"

const Dashboard = () => {
    const { redirect, message } = useSelector(state => state.PostReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: REMOVE_MESSAGE })
        }

    }, [dispatch, redirect, message])
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard" />
            </Helmet>
            <Toaster position="top-right"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    style: {
                        fontSize: "15px"

                    }
                }} />
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard
