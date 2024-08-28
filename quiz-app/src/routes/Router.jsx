import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Game from '../pages/Game'
import Home from '../pages/Home'
import End from '../pages/End'

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game' element={<Game />} />
      <Route path='/end' element={<End />} />
    </Routes>
  )
}

export default Router