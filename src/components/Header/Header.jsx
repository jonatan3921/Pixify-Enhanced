import React, {useContext} from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'

function Header() {
    const navigate = useNavigate()
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    const handleTheme = () => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode)
      localStorage.setItem('darkMode', newDarkMode)
    }

  return (
    <div className='header-container'>
        <h1 onClick={() => navigate('/')}>PIXIFY</h1>
        <div className='links-container'>
            <Link className='link' to={'/submissions'}><p>Submissions</p></Link>
            <Link className='link' to={'/about'}><p>About</p></Link>
            <button className='darkmode-btn' onClick={handleTheme}>{darkMode ? 'Light Mode' : "Dark Mode"}</button>
        </div>
    </div>
  )
}

export default Header