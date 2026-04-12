import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/jesus', label: '기독교' },
  { path: '/buddha', label: '불교' },
  { path: '/mary',   label: '천주교' },
  { path: '/me',     label: '@@를 믿기' },
]

const Nav = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="nav">
      {tabs.map(({ path, label }) => (
        <button
          key={path}
          className={`nav__tab ${pathname === path ? 'nav__tab--active' : ''}`}
          onClick={() => navigate(path)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

export default Nav