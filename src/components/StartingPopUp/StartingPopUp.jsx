import React from 'react'

export default function StartingPopUp({ setStartingPopUp }) {
  
  const closePopUp = () => {
    const canvas = document.querySelector("canvas")
          canvas.requestPointerLock();
      setStartingPopUp(false)
  }
  return (
      <div className='overlay'>
      <div className='popUpContainer'>
          <div className="message">
              To unlock the mouse double-click, please 
          </div>
          <button className="action" onClick={closePopUp}>
              Got it
          </button>
    </div>
    </div>
  )
}
