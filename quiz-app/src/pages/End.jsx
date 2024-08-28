import React from 'react'
import { Link } from 'react-router-dom'

function End() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-around bg-[#213a57] px-4'>
      <h1 className='text-center text-slate-100 text-4xl'>If you want to play again, click here</h1>
      <button className='bg-[#80ed99] px-6 py-2 rounded-md text-[#213a57] hover:bg-[#0b6477] hover:text-[#45dfb1]'><Link to='/'>Play again</Link></button>
    </div>
  )
}

export default End