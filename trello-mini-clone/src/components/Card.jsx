import React, { useState, useRef } from "react";
import { HiTrash, HiPencil, HiX, HiCheck, HiEye, HiScissors, HiClipboardCopy } from "react-icons/hi";
import useTrelloStore from "../store/trelloStore";

function Card({ title, listId, id, description, removeCard, edditCardTitle, moveCard, copyCard }) {
  const [showLActions, setShowLActions] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [copyTo, setCopyTo] = useState(false);
  const [moveTo, setMoveTo] = useState(false);
  const newTitle = useRef();
  const listArray = useTrelloStore((state) => state.listsArray);
  const toggleDetailedCardView = useTrelloStore((state) => state.toggleDetailedCardView);
  const passDataToDetailedCard = useTrelloStore((state) => state.passDataToDetailedCard);

  const showListActions = () => {
    setShowLActions(!showLActions);
  };
  const setShowI = () => {
    setShowInput(!showInput);
    setShowLActions(!showLActions);
  };

  const changeTitle = (listId, id) => {
    if (newTitle.current.value !== "") {
      handleEdditTitleCard(listId, id, newTitle.current.value);
      setShowInput(!showInput);
    }
  };
  const cancelEditTitle = () => {
    setShowInput(!showInput);
  };

  const handleDeleteCard = (listId, id) => {
    removeCard(listId, id);
  };
  const handleEdditTitleCard = (listId, id, title) => {
    edditCardTitle(listId, id, title);
  };
  const handleMoveCard = () => {
    setMoveTo(!moveTo);
  };
  const selectTargetListForMove = (targerId, listId, id) => {
    const targetList = targerId;
    console.log(targerId);
    handleMoveCard();
    moveCard(listId, targetList, id);
    setMoveTo(!moveTo);
  };

  const handleCopyCard = () => {
    setCopyTo(!copyTo);
  };
  const selectTargetListForCopy = (targerId, listId, id) => {
    const targetList = targerId;
    console.log(targerId);
    handleCopyCard();
    copyCard(listId, targetList, id);
    setCopyTo(!copyTo);
    setShowLActions(!showLActions);
  };
  const handleToggleDetailedCardView = (listId, cardId) => {
    passDataToDetailedCard(listId, cardId);
    toggleDetailedCardView();
  };

  return (
    <div className='bg-[#faf9f6] rounded-md p-3 mt-2 flex items-center flex-col'>
      <header className='flex items-baseline justify-between relative'>

        <div className='flex gap-2'>
          {!showInput &&
            <h1 className='text-base flex items-center font-semibold w-40 h-8 overflow-hidden'>{title}</h1>}

          {showInput &&
            <>
              <input autoFocus defaultValue={title} className='p-1 rounded-md w-28 outline-none bg-slate-100' ref={newTitle} placeholder='Enter a new title' />
              <button onClick={() => changeTitle(listId, id)} className='bg-sky-500 rounded-md size-7 grid place-items-center text-white hover:bg-sky-700 duration-75 ease-in-out'><HiCheck /></button>
              <button onClick={cancelEditTitle} className='border-2 border-sky-500 rounded-md size-7 grid place-items-center text-sky-500 hover:bg-red-700 hover:border-none hover:text-white duration-75 ease-in-out'><HiX /></button>
            </>}
        </div>

        <div onClick={showListActions} className='flex items-center cursor-pointer text-3xl hover:text-4xl duration-75 ease-in-out select-none'>...</div>

        {
          showLActions &&
          <div className='absolute bg-slate-50 shadow-md p-2 right-6 top-6 flex flex-col gap-2'>
            {(!moveTo && !copyTo)
              ? <>
                <button onClick={() => handleToggleDetailedCardView(listId, id)} className='bg-white border-2 border-sky-300 p-1 rounded-md hover:bg-sky-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center hover:border-2 hover:border-sky-700'><HiEye /> Open card</button>
                <button onClick={() => handleMoveCard(listId, id)} className='bg-white border-2 border-sky-300 p-1 rounded-md hover:bg-sky-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center hover:border-2 hover:border-sky-700'><HiScissors /> Move to</button>
                <button onClick={() => handleCopyCard(listId, id)} className='bg-white border-2 border-sky-300 p-1 rounded-md hover:bg-sky-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center hover:border-2 hover:border-sky-700'><HiClipboardCopy /> Copy to</button>
                <button onClick={setShowI} className='bg-white border-2 border-sky-300 p-1 rounded-md hover:bg-sky-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center hover:border-2 hover:border-sky-700'><HiPencil /> Edit card title</button>
                <button onClick={() => handleDeleteCard(listId, id)} className='bg-red-300 px-1 py-2 rounded-md hover:bg-red-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center'><HiTrash /> Delete card</button>
              </>
              : (moveTo && !copyTo)
                ? <>
                  {listArray?.filter((list) => list.id !== listId).map((list) => {
                    return (
                      <div key={list.id}>
                        <span onClick={() => selectTargetListForMove(list.id, listId, id)} className='bg-white border-2 border-sky-300 p-1 rounded-md hover:bg-sky-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center hover:border-2 hover:border-sky-700 cursor-pointer'>{list.title}</span>
                      </div>
                    );
                  })}
                  <span onClick={() => setMoveTo(!moveTo)} className='cursor-pointer bg-red-500 px-1 py-2 rounded-md hover:bg-red-800 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center text-slate-100'>Cancel</span>
                </>
                : <>
                  {listArray?.filter((list) => list.id !== listId).map((list) => {
                    return (
                      <div key={list.id}>
                        <span onClick={() => selectTargetListForCopy(list.id, listId, id)} className='bg-white border-2 border-sky-300 p-1 rounded-md hover:bg-sky-700 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center hover:border-2 hover:border-sky-700 cursor-pointer'>{list.title}</span>
                      </div>
                    );
                  })}
                  <span onClick={() => setCopyTo(!copyTo)} className='cursor-pointer bg-red-500 px-1 py-2 rounded-md hover:bg-red-800 hover:text-slate-100 duration-75 ease-in-out flex items-center gap-2 justify-center text-slate-100'>Cancel</span>
                </>}
          </div>
        }
      </header>

      <div className='self-start flex flex-col my-2 border border-slate-300 w-52 p-2 rounded-lg h-24 overflow-hidden'>
        <span className='text-base font-bold decoration-solid underline'>Description</span>
        <span className='text-base text-slate-600 font-serif'>{description}</span>
      </div>
    </div>
  );
}

export default Card;
