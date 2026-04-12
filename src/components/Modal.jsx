import React, { useState } from 'react'

const Modal = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [wish, setWish] = useState('')

  const handleSubmit = () => {
    if (!wish.trim()) return
    onSubmit({
      name: name.trim() || '익명',
      wish: wish.trim()
    })
  }

  return (
    <div className='modal__overlay'>
      <div className='modal'>
        <h2 className='modal__title'>🙏 소원을 말해봐</h2>
        <p className='modal__sub'>
          이름이랑 소원을 입력하면
          <br />
          신들이 열심히 들어줍니다 (아마도)
        </p>

        <input
          className='modal__input'
          placeholder='이름 (공백시 익명)'
          maxLength={10}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              document.getElementById('wishInput')?.focus()
            }
          }}
        />

        <textarea
          id='wishInput'
          className='modal__textarea'
          placeholder='소원을 입력하세요'
          maxLength={100}
          value={wish}
          onChange={(e) => setWish(e.target.value)}
        />

        <button className='modal__btn' onClick={handleSubmit}>
          🌟 소원 빌기!
        </button>
      </div>
    </div>
  )
}

export default Modal