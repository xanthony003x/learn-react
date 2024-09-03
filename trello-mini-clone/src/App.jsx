import Header from "./components/Header"
import Board from "./components/Board"

export default function App() {
  return (
    <div className="min-h-screen w-screen bg-slate-100 overflow-hidden">
      <Header />
      <Board />
    </div>
  )
}