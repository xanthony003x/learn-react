import React from 'react'
import { PALABROS } from '../palabros'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Contexto from '../context/Contexto'

const Juego = () => {
  const navegacion = useNavigate()
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const misColores = [{ backgroundColor: 'white' }, { backgroundColor: 'green', color: 'white' }, { backgroundColor: 'red', color: 'white' }]
  const letras_array = letras.split('')
  const { escribirCorrecta } = useContext(Contexto)
  const [azar, setAzar] = useState(0)
  const [palabra, setPalabra] = useState([])
  const [misLetras, setMisLetras] = useState([])
  const [correctas, setCorrectas] = useState([])
  const [erroneas, setErroneas] = useState([])
  const [imagen, setImagen] = useState(1)

  useEffect(() => {
    setAzar(Math.floor(Math.random() * PALABROS.length))
  }, [])

  useEffect(() => {
    setPalabra(PALABROS[azar].palabra.split(''))
    escribirCorrecta(PALABROS[azar.palabra])
  }, [azar])

  const pulsado = (e) => {
    const letra = e.target.innerHTML
    setMisLetras([...misLetras, (letra)])

    if (palabra.indexOf(letra) >= 0) {
      setCorrectas([...correctas, (letra)])
    } else {
      setErroneas([...erroneas, (letra)])
      setImagen(imagen + 1)
      if (imagen > 5) {
        navegacion('/final')
      }
    }
  }

  useEffect(() => {
    let noEncontrado = 0

    palabra.map(p => {
      if (misLetras.find(e => e === p) === undefined) {
        noEncontrado++
      }
    })
    if (noEncontrado === 0 && correctas.length > 0) {
      navegacion('/ganado')
    }
  }, [correctas])

  return (
    <>
      <div className='pregunta'>{PALABROS[azar].pregunta}</div>

      <div className='flex'>
        {
          palabra.map((letra, i) => (
            misLetras.indexOf(letra) === -1
              ? <div className='m-0.5 border-solid border-black w-8 h-11 text-center text-lg' key={i}>_</div>
              : <div className='m-0.5 border-solid border-black w-8 h-11 text-center text-lg' key={i}>{letra.toUpperCase()}</div>
          ))}
      </div>

      <div className='botones'>
        {
          letras_array.map((letra) => (
            (correctas.find(e => e === letra))
              ?
              <button style={misColores[1]} className='m-1 py-1 text-lg bg-white border-dashed border-black rounded-sm cursor-pointer w-9 text-center' key={letra}>{letra}</button>
              :
              (erroneas.find(e => e === letra))
                ?
                <button style={misColores[2]} className='m-1 py-1 text-lg bg-white border-dashed border-black rounded-sm cursor-pointer w-9 text-center' key={letra}>{letra}</button>
                :
                <button style={misColores[0]} className='m-1 py-1 text-lg bg-white border-dashed border-black rounded-sm cursor-pointer w-9 text-center' key={letra} onClick={pulsado}>{letra}</button>
          ))
        }
      </div>

      <div className='imagen'>
        <img src={require(`../../public/imagenes/el_ahorcado${imagen}.png`)} alt='' />
      </div>
    </>
  )
}

export default Juego