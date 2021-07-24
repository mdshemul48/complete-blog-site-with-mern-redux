import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { useSelector, useDispatch } from "react-redux"
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../store/types/PostTypes'
import { Toaster, toast } from "react-hot-toast"
import { fetchPosts } from '../store/asyncMethods/PostMethods'
import { Link } from 'react-router-dom'
import { BsPencil, BsArchive } from "react-icons/bs"

import Loader from './Loader'
import Sidebar from './sidebar'
const Dashboard = () => {
    const { redirect, message, loading } = useSelector(state => state.PostReducer)
    const { user: { _id: id } } = useSelector(state => state.AuthReducer)
    const { posts } = useSelector(state => state.FetchPosts)
    console.log(posts)
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
            <div className="container mt-100">
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-3 p-15">
                        <Sidebar />
                    </div>
                    <div className="col-9 p-15">
                        {!loading ? posts.length > 0 ? posts.map(
                            (post) => {
                                return <div className="dashboard__posts" key={post._id}>
                                    <div className="dashboard__posts__title">
                                        <Link to="/">{post.title}</Link>
                                    </div>
                                    <div className="dashboard__posts__links">
                                        <Link to="/"><BsPencil className="icon" /></Link>
                                        <BsArchive className="icon" />
                                    </div>

                                </div>
                            }
                        ) : "you dont have any post" : <Loader />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
