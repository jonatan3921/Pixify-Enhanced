import React, {useContext, useState} from 'react'
import './Auth.css'
import { ThemeContext } from '../../context/ThemeContext'
import { auth } from '../../config/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const {darkMode} = useContext(ThemeContext)
    const navigate = useNavigate()

    const [existingUser, setExistingUser] = useState(true);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = (e) => {
      e.preventDefault();

      createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {displayName: name});
        navigate('/submissions')
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
    }

    const handleLogin = (e) => {
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        navigate('/submissions')
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
    }

  return (
    <div className={darkMode ? 'auth-page auth-page-dark' : 'auth-page'}>
      {existingUser ? (
        <form className={darkMode ? 'form-dark' : null} onSubmit={handleLogin}>
          <h2>Log in</h2>
          <p>Welcome back!</p>
          <div>

            <input type="email" placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)} value={email}/>

            <input type="password" placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)} value={password}/>

          </div>
          <button type='submit'>Log in</button>
          <p>
              Don't have an account? {' '}
              <span onClick={() => setExistingUser(!existingUser)}>Sign up</span>
          </p>
        </form>
      ) : (
        <form className={darkMode ? 'form-dark' : null} onSubmit={handleSignup}>
          <h2>Sign up</h2>
          <p>comment submission from other people and save your own work</p>
          <div>

            <input type="text" placeholder='Enter your name' required onChange={(e) => setName(e.target.value)} value={name}/>

            <input type="email" placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)} value={email}/>

            <input type="password" placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)} value={password}/>

          </div>
          <button type='submit'>Sign up</button>
          <p>
              Already have an account? {' '}
              <span onClick={() => setExistingUser(!existingUser)}>Login</span>
          </p>
        </form>
      )
      }
        
    </div>
  )
}

export default Auth