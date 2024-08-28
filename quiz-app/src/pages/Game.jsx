import React, { useState } from 'react'
import questionsArray from '../services/sports-true-false-questions'
import { useNavigate } from 'react-router-dom'

function Game() {
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [answerColor, setAnswerColor] = useState(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const navigate = useNavigate()

  const handleAnswer = (e) => {
    setIsButtonDisabled(true)
    if (e.target.innerText === questionsArray.results[index].correct_answer) {
      setCorrect((correct) => correct + 1)
      setAnswerColor(1)
    } else if (e.target.innerText === questionsArray.results[index].incorrect_answers) {
      setIncorrect((incorrect) => incorrect + 1)
      setAnswerColor(2)
    }

    setTimeout(() => {
      setIndex((i) => i + 1)
      setAnswerColor(0)
      setIsButtonDisabled(false)

      if (index + 1 === questionsArray.results.length) {
        navigate('/end', { replace: true })
      }
    }, 2000)
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-around bg-[#213a57]'>
      <h1 className='text-slate-100 text-3xl font-serif decoration-wavy decoration-slate-400 underline'>Answer true or false</h1>

      <div className='bg-[#0b6477] w-80 h-80 rounded-md flex flex-col items-center justify-around p-4'>
        <div className='self-end text-white decoration-solid decoration-slate-200 underline'><span className='text-green-400'>Correct: {correct}</span> / <span className='text-red-400'>Incorrect: {incorrect}</span></div>

        <h2 className={`text-slate-300 text-center font-bold text-xl ${(answerColor === 1) && 'text-green-400'} ${(answerColor === 2) && 'text-red-400'}`}>{questionsArray.results[index].question}</h2>

        <div className='flex flex-col gap-2'>
          <button disabled={isButtonDisabled} onClick={handleAnswer} className='bg-[#80ed99] px-14 py-2 font-bold text-lg rounded-md text-[#213a57] hover:bg-sky-500 hover:text-white'>True</button>
          <button disabled={isButtonDisabled} onClick={handleAnswer} className='bg-[#213a57] px-14 py-2 font-bold text-lg rounded-md text-[#80ed99] hover:bg-red-500 hover:text-white'>False</button>
        </div>
      </div>
    </div>
  )
}

export default Game