import React, {useContext} from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'


function Header() {
    const navigate = useNavigate()
    const {darkMode, setDarkMode} = useContext(ThemeContext)
    const [user] = useAuthState(auth)

    const handleTheme = () => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode)
      localStorage.setItem('darkMode', newDarkMode)
    }

  return (
    <div className='header-container'>
        <h1 onClick={() => navigate('/')}>PIXIFY</h1>
        <label className='burger' htmlFor='menuchk'>&#9776;</label>
        <input type='checkbox' id='menuchk'/>
        <div className='links-container'>
            <Link className='link' to={'/submissions'}><p>Submissions</p></Link>
            <Link className='link' to={'/about'}><p>About</p></Link>
            {
              user 
              ?
              <Link className='user' to={`/account/${user?.uid}`}>{user?.displayName}</Link>
              :
              <Link className='signin' to={'/auth'}><p>Sign in</p></Link>
            }
            <button className='darkmode-btn' onClick={handleTheme}>{darkMode ? 'Light Mode' : "Dark Mode"}</button>
        </div>
    </div>
  )
}

export default Header