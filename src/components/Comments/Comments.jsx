import React, {useState, useEffect, useContext} from 'react'
import './Comments.css'
import { auth, db } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { ThemeContext } from '../../context/ThemeContext'

function Comments({submissionId}) {
    const [user] = useAuthState(auth)
    const {darkMode} = useContext(ThemeContext);
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])

    // Show all comments when page loads
    useEffect(
        () => {
            // get reference to the comments collection
            const commentsRef = collection(db, 'comments')
            
            // filter to show only comments for this submissions
            const q = query(commentsRef, where('submissionId', '==', submissionId))

            onSnapshot(q, (snapshot) => {
                // convert to array
                const comments = snapshot.docs.map((item) => ({
                    ...item.data(),
                    id: item?.id
                }))
                setComments(comments);
            })
        }, []
    )

    const addNewComment = (e) => {
        e.preventDefault()
        // need to make a new document in comments collection
        // the document need to save the newComment,the articleId, and the user who created it
        // create a reference to the comments collection
        // will create the collection if doesn't exist
        const commentsRef = collection(db, 'comments')
        // add a document with this articleId, userId

        addDoc(commentsRef, {
            userId: user?.uid,
            submissionId: submissionId,
            content: newComment,
            username: user?.displayName
        }).then(res => {
            toast('Comment added!', {
                type: 'success',
                autoClose: 1500
            })
            setNewComment('')
        })
    }

    const deleteComment = (id) => {
        // we need the id of the comment to delete it so we are passing it as a function parameter
        // get the particular document with this id
        deleteDoc(doc(db, 'comments', id))
        .then(res => {
            toast('Comment deleted successfully!', {
                type: "success",
                autoClose: 1500
            })
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='comments-components'>
        <div className={darkMode ?`comments-container comments-container-dark` : 'comments-container'}>
            {
                comments.map(item => (
                    <div className='comment' key={item?.id}>
                        <p>
                            <span>{item?.username}</span> {item?.content}
                        </p>
                        {
                            // each comment has uid compare to see if I am the owner of the comment to delete it
                            user?.uid === item?.userId && (
                                <button onClick={() => deleteComment(item?.id)}>Delete</button>
                            )
                        }
                    </div>
                ))
            }
        </div>

        {
            user ? (
                <form onSubmit={addNewComment} className={darkMode? 'comment-form comment-form-dark' :'comment-form'}>
                    <input type='text' placeholder='Add Comment'
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}/>
                </form>
            ) : (
                <p className='not-user-msg'>Please login to comment</p>
            )
        }
    </div>
  )
}

export default Comments