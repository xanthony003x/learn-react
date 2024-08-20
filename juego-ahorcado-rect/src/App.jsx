import { Route, Routes } from 'react-router-dom'
import Juego from './components/Juego'
import Ganado from './components/Ganado'
import Poratda from './components/Portada'
import Final from './components/Final'
import Provider from './context/Provider'

export default function App() {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={<Poratda />} />
        <Route path='juego/' element={<Juego />} />
        <Route path='/final' element={<Final />} />
        <Route path='/ganado' element={<Ganado />} />
      </Routes>
    </Provider>
  )
}