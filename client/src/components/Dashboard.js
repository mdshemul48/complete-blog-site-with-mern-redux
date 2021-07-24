import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { useSelector, useDispatch } from "react-redux"
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../store/types/PostTypes'
import { Toaster, toast } from "react-hot-toast"
import { fetchPosts } from '../store/asyncMethods/PostMethods'
const Dashboard = () => {
    const { redirect, message } = useSelector(state => state.PostReducer)
    const { user: { _id: id } } = useSelector(state => state.AuthReducer)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPosts(id))
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: REMOVE_MESSAGE })
        }

    }, [dispatch, redirect, message, id])
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
