import { useSelector} from 'react-redux'
import { Redirect, useHistory, useParams, Link } from "react-router-dom"
import UserPhoto from '../../images/user.svg'
import { useState, useContext } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Context } from "../../index.js"

const ProductModal = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const params = useParams()
    const [commentText, setCommentText] = useState('')
    const product = useSelector(state => state.entities[params.id])
    const history = useHistory()
    if (!product) {
        return <Redirect to='/'/>
    }
    const comments = [...product.comments]
    const renderedComments = comments.reverse().map(comment => {
        return (
            <div className="comment">
                <div className="avatar-and-name">
                    <img src={comment.photo} alt={`${comment.author}'s avatar`}/>
                    <h1>{comment.author}</h1>
                </div>
                <p>{comment.text}</p>
            </div>
        )
    })

    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{product.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                            history.push('/')
                        }}/>
                    </div>
                    <div className="modal-body">
                        <img src={product.img} alt={product.title}/>
                        <p>{product.info}</p>
                        <div className="comments">
                            <div className="leave-comment">
                                <h1>Comments</h1>
                                <textarea rows="3" placeholder="Type comment" value={commentText} onChange={(event) =>{
                                    setCommentText(event.target.value)
                                    }}/>
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    if (!commentText) return
                                    const newComment = {
                                        photo: user ? user.photoURL : UserPhoto,
                                        author: user ? user.displayName : 'Guest',
                                        text: commentText
                                    }
                                    const comments = [...product.comments, newComment]
                                    
                                    firestore.collection('comments').doc(product.id).set({
                                        id: product.id,
                                        comments
                                        })
                                        setCommentText('')
                                }}>Add comment</button>
                            </div>
                            {renderedComments}
                        </div>
                    </div>
                    <div className="modal-footer">
                    <h1 className="price">{product.price}$</h1>
                    <Link className="btn btn-primary" to={`/product/${params.id}/pay`}>Buy</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal