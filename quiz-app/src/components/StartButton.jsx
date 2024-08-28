import React from 'react'
import { Link } from 'react-router-dom'

function StartButton() {
  return (
    <button className='bg-[#80ed99] px-6 py-2 rounded-md text-[#213a57] hover:bg-[#0b6477] hover:text-[#45dfb1]'><Link to='/game'>Start Game</Link></button>
  )
}

export default StartButton