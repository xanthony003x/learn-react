import React from 'react'
import { useNavigate } from 'react-router-dom'

const Ganado = () => {
  const navegacion = useNavigate()

  return (
    <>
      <h1>Muy bien, has ganado, y continuas manteniendo tu cabeza sobre los hombros</h1>
      <div>
        <img src={require(`../../public/imagenes/el_ahorcado1.png`)} alt='' />
      </div>
      <button onClick={() => navegacion('/juego/')}>Volver a Jugar</button>
    </>
  )
}

export default Ganado