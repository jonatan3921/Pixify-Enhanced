import React from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div className='homepage-container'>
        <p>Join our photography contest and showcase your talent to the world! Immerse yourself in a community of photographers, where creativity and passion come together. Share your best shots, be inspired by others, and have a chance to win amazing prizes. Enter now and take the first step to becoming a recognized photographer.</p>
        <Link className='submit-btn' to={'/submissions'}>SUBMIT NOW</Link>
    </div>
  )
}

export default Homepage