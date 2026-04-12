import React, { useState, useEffect, useRef } from 'react'
import Nav from './Nav'
import BuddhaImg from '../assets/img/buddha.png'
import buddhaSound from '../assets/mp3/buddha.wav'

const Buddha = ({ wishData }) => {
  const [isPraying, setIsPraying] = useState(false)
  const [myWish, setMyWish] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    setMyWish(wishData?.wish || '')
  }, [wishData])

  const handleWishChange = (e) => {
    setMyWish(e.target.value)
  }

const playBuddhaSound = () => {
  try {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(buddhaSound)

    audio.volume = 0.8
    audio.playbackRate = 1.5   // 🔥 속도 빠르게
    audio.currentTime = 1.5    // 🔥 앞부분 컷

    audio.play()

    audioRef.current = audio
  } catch (e) {}
}
  const startPrayer = () => {
    setIsPraying(true)
    playBuddhaSound()

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
          <img src={BuddhaImg} alt='부처님' className='prayer__photo' />
          <div className='prayer__wish--glow'>{myWish}</div>
        </div>
      )}

      <div className='buddha_wrap'>
        <img src={BuddhaImg} alt='부처님' className='god__photo' />

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

export default Buddha