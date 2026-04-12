import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './assets/style.scss'
import Modal from './components/Modal'
import Jesus from './components/Jesus'
import Buddha from './components/Buddha'
import Mary from './components/Mary'
import Me from './components/Me'

const App = () => {
  const [wishData, setWishData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('wishData')
    if (saved) setWishData(JSON.parse(saved))
  }, [])

  const handleSubmit = (data) => {
    localStorage.setItem('wishData', JSON.stringify(data))
    setWishData(data)
  }

  return (
    <BrowserRouter>
      <div className='wrap'>
        {!wishData && <Modal onSubmit={handleSubmit} />}
        <Routes>
          <Route path='/' element={<Navigate to='/me' />} />
          <Route path='/jesus'  element={<Jesus  wishData={wishData} />} />
          <Route path='/buddha' element={<Buddha wishData={wishData} />} />
          <Route path='/mary'   element={<Mary   wishData={wishData} />} />
          <Route path='/me'     element={<Me     wishData={wishData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App