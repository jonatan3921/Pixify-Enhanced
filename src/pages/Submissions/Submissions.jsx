import React, {useState, useEffect, useContext} from 'react'
import './Submissions.css'
import { db } from '../../config/firebaseConfig'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useNavigate} from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext';

function Submissions() {
      const [formData, setFormData] = useState({
        title: '',
        name: '',
        images: [],
      })
      const [nameInput, setNameInput] = useState('')
      const [titleInput, setTitleInput] = useState('')
      const [imageInput1, setImageInput1] = useState('')
      const [imageInput2, setImageInput2] = useState('')
      const [imageInput3, setImageInput3] = useState('')
      const [imageInput4, setImageInput4] = useState('')
      const [imageInput5, setImageInput5] = useState('') 


      const [submissions, setSubmissions] = useState([])
      const navigate = useNavigate()
      const {darkMode} = useContext(ThemeContext)
      
    
      useEffect(
        () => {
          //Create a variable to reference the imageSets collection
          const submissionsRef = collection(db, 'imageSets')
          getDocs(submissionsRef)
          .then(res => {
            // Here we getting the data and mapping the data with the id per each articles
            const submissions = res.docs.map(item => {
              return {
                ...item.data(),
                id: item.id
              }
            })
            setSubmissions(submissions)
          })
          .catch(err => console.log(err))
        }, [submissions]
      )
    
      const handleSubmit = (e) => {
        e.preventDefault()
            // Create submission reference
            const submissionRef = collection(db, 'imageSets')

            // setFormData({...formData, name: nameInput, title: titleInput})

            // setFormData(prevObject => ({
            //   ...prevObject,
            //   images: [...prevObject.images, imageInput1, imageInput2, imageInput3, imageInput4, imageInput5]
            // }))
    
            // use addDoc to add the submission to the collection
            addDoc(submissionRef, {
              ...formData
            })


            setTimeout(() => {
              setNameInput('')
              setTitleInput('')
              setImageInput1('')
              setImageInput2('')
              setImageInput3('')
              setImageInput4('')
              setImageInput5('')
            }, 1000)
      }


  return (
    <div className={darkMode ? 'submissions-page submissions-page-dark' :`submissions-page`}>
        <section className='submissions'>
            <h1 className={darkMode ? 'header-dark' : null}>SUBMISSIONS</h1>
            <div className='submissions-container'>
              {
                submissions?.map(item => 
                  <div className='submission' onClick={() => navigate(`/submission/${item.id}`)}>
                    <img src={item.images[0]} alt={item.title}/>
                    <div className='submission-info'>
                      <p className={darkMode ? 'info info-dark' :'info'}>{item.title} - {item.name}</p>
                      <p className={darkMode ? 'see-more see-more-dark' :'see-more'}>see more</p>
                    </div>
                  </div>
                )
              }
            </div>
        </section>

        <form onSubmit={handleSubmit}>
          <h2>SUBMIT YOUR WORK</h2>
          <input type="text" placeholder='Your Name' value={nameInput} onChange={(e) => {
            setNameInput(e.target.value)
            setFormData({...formData, name: e.target.value})
          }} required/>

          <input type="text" placeholder='Title of Your Entry' value={titleInput} onChange={(e) => {
            setTitleInput(e.target.value)
            setFormData({...formData, title: e.target.value})
          }} required/>

          <input type="url" placeholder='Image Url One' value={imageInput1} accept='image/*' onChange={(e) => {
            setImageInput1(e.target.value)
            setFormData(prevObject => ({
              ...prevObject,
              images: [...prevObject.images, e.target.value]
            }))
          }} required/>

          <input type="url" placeholder='Image Url Two' value={imageInput2} accept='image/*' onChange={(e) => {
            setImageInput2(e.target.value)
            setFormData(prevObject => ({
              ...prevObject,
              images: [...prevObject.images, e.target.value]
            }))
          }} />

          <input type="url" placeholder='Image Url Three' value={imageInput3} accept='image/*' onChange={(e) => {
            setImageInput3(e.target.value)
            setFormData(prevObject => ({
              ...prevObject,
              images: [...prevObject.images, e.target.value]
            }))
          }} />

          <input type="url" placeholder='Image Url Four' value={imageInput4} accept='image/*' onChange={(e) => {
            setImageInput4(e.target.value)
            setFormData(prevObject => ({
              ...prevObject,
              images: [...prevObject.images, e.target.value]
            }))
          }} />

          <input type="url" placeholder='Image Url Five' value={imageInput5} accept='image/*' onChange={(e) => {
            setImageInput5(e.target.value)
            setFormData(prevObject => ({
              ...prevObject,
              images: [...prevObject.images, e.target.value]
            }))
          }} />

          <input type="submit" className='btn'/>

        </form>
    </div>
  )
}

export default Submissions