import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { useSelector, useDispatch } from "react-redux"
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../store/types/PostTypes'
import { Toaster, toast } from "react-hot-toast"
import { fetchPosts } from '../store/asyncMethods/PostMethods'
import { Link } from 'react-router-dom'
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
                <div className="row">
                    <div className="col-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam provident deleniti consectetur quos praesentium, mollitia soluta adipisci aperiam, harum saepe quo quam aut accusantium commodi debitis perspiciatis amet beatae sapiente.
                    </div>
                    <div className="col-9">
                        {!loading ? posts.length > 0 ? posts.map(
                            (post) => {
                                return <div className="dashboard__post" key={post._id}>
                                    <div className="dashboard_post__title">
                                        <Link to="/">{post.title}</Link>
                                    </div>
                                </div>
                            }
                        ) : "you dont have any post" : "loading"}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
