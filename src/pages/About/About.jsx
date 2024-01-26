import React, {useContext} from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import aboutImg from '../../assets/about.jpg'
import { ThemeContext } from '../../context/ThemeContext'

function About() {
    const {darkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode ? 'about-page about-page-dark ' :'about-page'}>
        <section className='about-summary'>
            <h2>ABOUT US</h2>
            <p>Welcome to Pixify, the ultimate destination for photography enthusiasts! We are a community of passionate photographers who believe in the power of capturing life's moments and sharing them with the world.</p>
        </section>
        <section className='about-details'>
            <div>
                <p>Our mission is to provide a platform for photographers to showcase their work, connect with like-minded individuals, and be recognised for their talent. That's why we created Pixify - a photography contest where photographers from all walks of life can enter their best shots and have a chance to win amazing prizes.</p>
                <p>At Pixify, we believe that photography is not just a hobby but an art form that can tell a story, evoke emotions, and leave a lasting impression. Whether you're a professional photographer or just starting out, we welcome you to join us on this journey and share your unique perspective with the world.</p>
                <p>So what are you waiting for? Enter our photography contest today, connect with other photographers, and take your passion to the next level with Pixify. We can't wait to see what you have in store!</p>
                <p>DEADLINE: <date>17TH FEBRUARY 2023</date></p>
                <Link className={darkMode ? 'about-submit-btn about-submit-btn-dark' :'about-submit-btn'} to='/submissions'>SUBMIT NOW</Link>
            </div>
            <aside>
                <img src={aboutImg} alt='about'/>
            </aside>
        </section>
    </div>
  )
}

export default About