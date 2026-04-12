import React, { useState, useEffect, useRef } from 'react'
import Nav from './Nav'
import jesus from '../assets/img/jesus.png'
import jesusSound from '../assets/mp3/jesus.mp3'

const Jesus = ({ wishData }) => {
  const [isPraying, setIsPraying] = useState(false)
  const [myWish, setMyWish] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    setMyWish(wishData?.wish || '')
  }, [wishData])

  const handleWishChange = (e) => {
    setMyWish(e.target.value)
  }

  const playJesusSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      const audio = new Audio(jesusSound)
      audio.volume = 0.8
      audio.play()

      audioRef.current = audio
    } catch (e) {}
  }

  const startPrayer = () => {
    setIsPraying(true)
    playJesusSound()

    setTimeout(() => {
      setIsPraying(false)

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }, 5000)
  }

  return (
    <>
      {isPraying && (
        <div className='prayer__fullscreen'>
          <img src={jesus} alt='하나님' className='prayer__photo' />
          <div className='prayer__wish--glow'>{myWish}</div>
        </div>
      )}

      <div className='jesus_wrap'>
        <img src={jesus} alt='하나님' className='god__photo' />

        <div className='wish_text'>
          <div>{wishData?.name}님의 소원</div>
          <input
            type='text'
            className='modal__input'
            placeholder='소원을 입력하세요'
            value={myWish}
            onChange={handleWishChange}
          />
        </div>

        <button className='please_start' onClick={startPrayer}>
          🙏 기도해드릴게요
        </button>

        <Nav />
      </div>
    </>
  )
}

export default Jesus