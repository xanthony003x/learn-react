import React, { useState, useRef } from "react";
import Card from "./Card";
import { HiTrash, HiPencil, HiX, HiCheck } from "react-icons/hi";

function List({ id, title, cardsArray, removeList, edditListtitle, cardId, addCard, removeCard, edditCardTitle, moveCard, copyCard }) {
  const [showLActions, setShowLActions] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const newTitle = useRef();

  const showListActions = () => {
    setShowLActions(!showLActions);
  };
  const setShowI = () => {
    setShowInput(!showInput);
    setShowLActions(!showLActions);
  };

  const changeTitle = (id) => {
    if (newTitle.current.value !== "") {
      handleEdditTitleList(id, newTitle.current.value);
      setShowInput(!showInput);
    }
  };
  const cancelEditTitle = () => {
    setShowInput(!showInput);
  };

  const handleDeleteList = (id) => {
    removeList(id);
  };
  const handleEdditTitleList = (id, title) => {
    edditListtitle(id, title);
  };
  const handleAddCard = (id, cardId) => {
    addCard(id, cardId);
  };

  return (
    <div className='bg-white w-64 rounded-sm shadow-sm p-3'>

      <header className='flex items-baseline justify-between relative'>

        <div className='flex gap-2'>
          {!showInput &&
            <h1 className='text-lg flex items-center font-bold w-40 h-8 overflow-hidden'>{title}</h1>}

          {showInput &&
            <>
              <input autoFocus defaultValue={title} className='p-1 rounded-md w-32 outline-none bg-slate-100' ref={newTitle} placeholder='Enter a new title' />
              <button onClick={() => changeTitle(id)} className='bg-sky-500 rounded-md size-7 grid place-items-center text-white hover:bg-sky-700 duration-75 ease-in-out'><HiCheck /></button>
              <button onClick={cancelEditTitle} className='border-2 border-sky-500 rounded-md size-7 grid place-items-center text-sky-500 hover:bg-red-700 hover:border-none hover:text-white duration-75 ease-in-out'><HiX /></button>
            </>}
        </div>

        <div onClick={showListActions} className='flex items-center cursor-pointer text-3xl hover:text-4xl duration-75 ease-in-out select-none'>...</div>

        {
          showLActions &&
          <div className='absolute bg-slate-50 shadow-md p-2 right-6 top-6 flex flex-col gap-2 z-50'>
            <button onClick={setShowI} className='bg-white border-2 border-sky-300 p-1 rounded-md hover:bg-sky-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center hover:border-2 hover:border-sky-700'><HiPencil /> Edit list title</button>
            <button onClick={() => handleDeleteList(id)} className='bg-red-300 p-1 rounded-md hover:bg-red-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center'><HiTrash /> Delete list</button>
          </div>
        }
      </header>

      {
        cardsArray?.map((item) => {
          return (
            <Card key={item.id} listId={id} id={item.id} title={item.title} description={item.description} removeCard={removeCard} edditCardTitle={edditCardTitle} moveCard={moveCard} copyCard={copyCard} />
          );
        })
      }

      <button onClick={() => handleAddCard(id, cardId)} className='bg-blue-500 rounded-md text-center text-white hover:bg-sky-700 duration-75 ease-in-out px-4 h-8 font-semibold mt-2'>+Add card</button>
    </div>
  );
}

export default List;
