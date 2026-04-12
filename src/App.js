import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './assets/style.scss'
import Modal from './components/Modal'
import Jesus from './components/Jesus'
import Buddha from './components/Buddha'
import Mary from './components/Mary'
import Me from './components/Me'

const App = () => {
  const [wishData, setWishData] = useState(null)

  const handleSubmit = (data) => {
    setWishData(data)
  }

  return (
    <BrowserRouter>
      <div className='wrap'>
        {!wishData && <Modal onSubmit={handleSubmit} />}

        <Routes>
          <Route path='/' element={<Navigate to='/jesus' />} />
          <Route
            path='/jesus'
            element={wishData ? <Jesus wishData={wishData} /> : null}
          />
          <Route
            path='/buddha'
            element={wishData ? <Buddha wishData={wishData} /> : null}
          />
          <Route
            path='/mary'
            element={wishData ? <Mary wishData={wishData} /> : null}
          />
          <Route
            path='/me'
            element={wishData ? <Me wishData={wishData} /> : null}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App