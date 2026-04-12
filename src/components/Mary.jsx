import React, { useState, useEffect, useRef } from 'react'
import Nav from './Nav'
import mary from '../assets/img/mary.png'
import marySound from '../assets/mp3/mary.mp3'

const Mary = ({ wishData }) => {
  const [isPraying, setIsPraying] = useState(false)
  const [myWish, setMyWish] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    setMyWish(wishData?.wish || '')
  }, [wishData])

  const handleWishChange = (e) => {
    setMyWish(e.target.value)
  }

  const playMarySound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      const audio = new Audio(marySound)
      audio.volume = 0.8
      audio.play()
      audioRef.current = audio
    } catch (e) {}
  }

  const startPrayer = () => {
    setIsPraying(true)
    playMarySound()

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
          <img src={mary} alt='성모 마리아님' className='prayer__photo' />
          <div className='prayer__wish--glow'>{myWish}</div>
        </div>
      )}

      <div className='mary_wrap'>
        <img src={mary} alt='성모 마리아님' className='god__photo' />

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

export default Mary