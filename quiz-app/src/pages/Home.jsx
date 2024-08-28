import WelcomeTag from '../components/WelcomeTag'
import StartButton from '../components/StartButton'

import React from 'react'

function Home() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-around bg-[#213a57] px-4'>
      <WelcomeTag />
      <StartButton />
    </div>
  )
}

export default Home