import React, {useState, useEffect, useContext} from 'react'
import './SubmissionDetails.css'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { ThemeContext } from '../../context/ThemeContext'
import Comments from '../../components/Comments/Comments'
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'


function SubmissionDetails() {
    const [user] = useAuthState(auth)
    const {submissionId} = useParams()
    const navigate = useNavigate()
    const {darkMode} = useContext(ThemeContext)
    const [submission, setSubmission] = useState({})
    const [count, setCount] = useState(0)


    // Need to get details for this submission from the database
    useEffect(
        () => {
            // Set up a reference to a single doc with the submissionId
            const docRef = doc(db, 'imageSets', submissionId)

            getDoc(docRef)
            .then(res => {
                setSubmission(res.data())
            })
            .catch(err => console.log(err))
        }, []
    )

    const handlePrevious = () => {
        if (count === 0) {
            setCount(4)
        } else {
            setCount(count - 1)
        }
    }

    const handleNext = () => {
        if (count + 1 === submission?.images.length) {
            setCount(0)
        } else {
            setCount(count + 1)
        }
    }

    const deleteSubmission = (id) => {
        // we need the id of the submission to delete it so we are passing it as a function parameter
        // get the particular document with this id
        deleteDoc(doc(db, 'imageSets', id))
        .then(res => {
            navigate('/submissions')
        })
        .catch(err => console.log(err))
    }

    const image = submission?.images ? <img src={submission?.images[count]} alt={submission?.title}/> : null
    const imgNumber = submission?.images ? <p className='counter'>{count+ 1} of {submission?.images.length}</p> : null


  return (
    <div className={darkMode ? 'current-collection-dark current-collection-container' : 'current-collection-container'}>
        <div className='current-collection-info'>
            <h1>{submission?.title}</h1>
            <p>{submission?.name}</p>
        </div>
        {image}
        {imgNumber}
        <div className='btns-container'>
            <button className={darkMode ? 'btn-change btn-dark' : 'btn-change'} onClick={handlePrevious}>Previous</button>
            <button className={darkMode ? 'btn-change btn-dark' : 'btn-change'} onClick={handleNext}>Next</button>
            {
                user?.uid == submission?.userId ?
                <button className={darkMode ? 'btn-change btn-dark btn-delete' : 'btn-change btn-delete'} onClick={() => deleteSubmission(submissionId)}>Delete</button>
                : null
            }
        </div>
        <Comments submissionId={submissionId}/>
    </div>
  )
}

export default SubmissionDetails