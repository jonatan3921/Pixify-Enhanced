import React, {useState, useEffect, useContext} from 'react'
import './Account.css'
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'


function Account() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const {darkMode} = useContext(ThemeContext);
    
    const [submission, setSubmission] = useState([])

    // Show all the submission of the user when the page loads
    useEffect(
        () => {
            // Get the reference of the collection
            const submissionsRef = collection(db, 'imageSets')

            // Filter to show submission from the user
            const q = query(submissionsRef, where('userId', '==', user?.uid))

            onSnapshot(q, (snapshot) => {
                // convert to array
                const submissions = snapshot.docs.map((item) => ({
                    ...item.data(),
                    id: item?.id
                }))
                setSubmission(submissions);
            })
        }, []
    )



    const handleLogout = () => {
        signOut(auth);
        navigate('/');
    }


  return (
    <div className={darkMode ? 'account-page account-page-dark' : 'account-page'}>
        <div className={darkMode ? 'account-info account-info-dark' : 'account-info'}>
            <p>{user?.displayName}</p>
            <button className='logout-btn' onClick={handleLogout}>Log out</button>
        </div>
        <h2 className={darkMode ? 'heading-dark heading' : 'heading'}>Your Submissions</h2>
        <div className='user-submissions'>
            {
                submission 
                ? submission.map(item => <div className='submission' onClick={() => navigate(`/submission/${item?.id}`)}>
                    <img src={item.images[0]} alt={item.title}/>
                    <div className='submission-info'>
                      <p className={darkMode ? 'info info-dark' :'info'}>{item.title} - {item.name}</p>
                      <p className={darkMode ? 'see-more see-more-dark' :'see-more'}>see more</p>
                    </div>
                </div>)
                : <p>No Submission Yet</p>
            }
        </div>
    </div>
  )
}

export default Account