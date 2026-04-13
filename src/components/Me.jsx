import React, { useState, useEffect, useRef } from 'react'
import Nav from './Nav'
import meSound from '../assets/mp3/me.mp3'

const Me = ({ wishData }) => {
  const [myPhoto, setMyPhoto] = useState(null)
  const [myGodName, setMyGodName] = useState('')
  const [myWish, setMyWish] = useState('')
  const [isPraying, setIsPraying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    setMyWish(wishData?.wish || '')
  }, [wishData])

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setMyPhoto(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleNameChange = (e) => {
    setMyGodName(e.target.value)
  }

  const handleWishChange = (e) => {
    setMyWish(e.target.value)
  }

  const playMySound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      const audio = new Audio(meSound)
      audio.volume = 0.8
      audio.play()
      audioRef.current = audio
    } catch (e) {}
  }

  const startPrayer = () => {
    setIsPraying(true)
    playMySound()

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
      {isPraying && myPhoto && (
        <div className='prayer__fullscreen'>
          <img src={myPhoto} alt={myGodName || '나님'} className='prayer__photo' />

          <div
            style={{
              position: 'absolute',
              top: '40px',
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: '20px',
              fontWeight: 600,
              padding: '0 20px'
            }}
          >
            전지전능하신 <br />
            <h1
              style={{
                color: '#dfb616',
                fontSize: '25px',
                fontWeight: 800,
                padding: '0 20px'
              }}
            >
              {myGodName || '@@'}님
            </h1>
            소원을 이루어주세요
          </div>

           <div className='prayer__wish--glow'>
            <div className="name">{wishData?.name}님의 소원</div>
            <strong> {myWish}</strong>
            <p>기도해드릴게요</p></div>
        </div>
      )}

      <div className='me_wrap'>
        <div className='me__photo-area'>
          {myPhoto ? (
            <>
              <div className='me__photo-wrap'>
                <img src={myPhoto} alt={myGodName || '나님'} className='me__photo' />

                <div className='me__name-box'>
                  <p>신을 뭐라고 부를까요?</p>
                  <input
                    type='text'
                    className='me__name-input'
                    placeholder='신 이름'
                    value={myGodName}
                    onChange={handleNameChange}
                  />
                </div>
              </div>

              <label className='me__photo-change'>
                사진 변경
                <input type='file' accept='image/*' onChange={handlePhoto} hidden />
              </label>
            </>
          ) : (
            <label className='me__photo-placeholder'>
              📸 {myGodName || '@@'}님 사진 올리기
              <input type='file' accept='image/*' onChange={handlePhoto} hidden />
            </label>
          )}
        </div>

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

export default Me