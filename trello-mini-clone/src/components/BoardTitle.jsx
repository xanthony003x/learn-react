import React, { useRef } from 'react'
import { useState } from 'react'
import { HiX, HiCheck } from 'react-icons/hi'
import { useLocalStorage } from '../hooks/useLocalStorage'

function BoardTitle() {
  const [title, setTitle] = useLocalStorage('boardTitle', 'Default title')
  const [editTitle, setEditTitle] = useState(false)
  const newTitle = useRef()

  const showEditTitle = () => {
    setEditTitle(!editTitle)
  }

  const changeTitle = () => {
    if (newTitle.current.value !== '') {
      setTitle(newTitle.current.value)
      setEditTitle(!editTitle)
    } else {
      return
    }
  }

  const cancelEditTitle = () => {
    setEditTitle(!editTitle)
  }

  return (
    <div className='mt-4 mx-4'>
      {!editTitle && <h1 onClick={showEditTitle} className='cursor-pointer w-44 break-words text-2xl font-semibold text-slate-700 hover:scale-110 hover:bg-slate-200 hover:p-2 rounded-lg duration-75 ease-in-out'>{title}</h1>}

      {editTitle && <div className='flex gap-2 items-center'>
        <input autoFocus defaultValue={title} ref={newTitle} className='px-2 py-1 rounded-lg w-44 outline-none' placeholder='Enter a new title' />

        <button onClick={changeTitle} className='bg-sky-500 rounded-md size-7 grid place-items-center text-white hover:bg-sky-700 duration-75 ease-in-out'><HiCheck /></button>
        <button onClick={cancelEditTitle} className='border-2 border-sky-500 rounded-md size-7 grid place-items-center text-sky-500 hover:bg-red-700 hover:border-none hover:text-white duration-75 ease-in-out'><HiX /></button>
      </div>}
    </div>
  )
}

export default BoardTitle