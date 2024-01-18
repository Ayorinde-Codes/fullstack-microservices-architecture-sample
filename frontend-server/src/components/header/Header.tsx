import React from 'react'
import './header.css'

interface HeaderProps {
  type?: string
}

const Header: React.FC<HeaderProps> = ({ type }) => {
  return (
    <div className="header">
      <div
        className={
          type === 'list' ? 'headerContainer listMode' : 'headerContainer'
        }
      >
        {type !== 'list' && (
          <>
            <h1 className="headerTitle">BASALT COUNTRY ENQUIRY</h1>
            <p className="headerDesc">
              We get details about country based on input
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
