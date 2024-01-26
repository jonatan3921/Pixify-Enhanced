import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import About from './pages/About/About'
import Submissions from './pages/Submissions/Submissions'
import SubmissionDetails from './pages/SubmissionDetails/SubmissionDetails'
import ThemeContextProvider from './context/ThemeContext'

function App() {

  return (
    <BrowserRouter>
    <ThemeContextProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/submissions' element={<Submissions/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/submission/:submissionId' element={<SubmissionDetails/>}/>
      </Routes>
    </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App
