import { useState, useEffect } from 'react'
import Helmet from "react-helmet";
import { useParams } from 'react-router';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../store/asyncMethods/PostMethods';


import "react-quill/dist/quill.snow.css"
const Edit = () => {
    const { id } = useParams()
    const [postDetail, setPostDetail] = useState({ title: "", description: "" })
    const [postBody, setPostBody] = useState("")
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.PostReducer)
    useEffect(() => {
        dispatch(fetchPost(id))
    }, [dispatch, id])

    return (
        <>
            <Helmet>
                <title>Edit post</title>
                <meta name="description" content="update post" />
            </Helmet>
            <div className="mt-100">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="card">
                                <h3 className="card__h3">Create a new post</h3>
                                <form action="title">
                                    <label htmlFor="title"></label>
                                    <input type="text"
                                        name="title" id="title"
                                        className="group__control"
                                        value={postDetail.title}
                                        onChange={(event) => setPostDetail({ ...postDetail, title: event.target.value })}
                                        placeholder="Post title" />

                                    <ReactQuill id="body" theme="snow" value={postBody} onChange={setPostBody} />

                                    <div className="group">
                                        <label htmlFor="description">Meta Description</label>

                                        <textarea
                                            id="description"
                                            name="description"
                                            cols="30" rows="10"
                                            defaultValue={postDetail.description}
                                            onChange={(event) => setPostDetail({ ...postDetail, description: event.target.value })} className="group__control" placeholder="meta description..." maxLength="150"></textarea>
                                        <p
                                            className="length">{
                                                postDetail.description ?
                                                    postDetail.description.length
                                                    : 0}</p>
                                    </div>
                                    <div className="group">
                                        <input type="submit" value="Edit" className="btn btn-default btn-block" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit
