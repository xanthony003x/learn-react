import React from 'react'
import { useNavigate } from 'react-router-dom'

const Poratda = () => {
  const navegacion = useNavigate()

  return (
    <>
      <h1>BIENVENIDO/A</h1>
      <button onClick={() => navegacion('/juego')}>Jugar</button>
    </>
  )
}

export default Poratda