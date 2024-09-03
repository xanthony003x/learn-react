import React from 'react'
import trelloBanner from '../assets/logo.png'

function Header() {
  return (
    <div className='flex justify-center py-3 bg-slate-200 shadow-md'>
      <img className='w-56' src={trelloBanner} alt='Trello Logo' />
    </div>
  )
}

export default Header