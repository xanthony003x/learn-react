import React from "react";
import useTrelloStore from "../store/trelloStore";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useRef } from "react";

function DetailedCard() {
  const listsArray = useTrelloStore((state) => state.listsArray);
  const toggleDetailedCardView = useTrelloStore((state) => state.toggleDetailedCardView)
  const listDetailedCardId = useTrelloStore((state) => state.listDetailedCardId);
  const cardDetailedCardId = useTrelloStore((state) => state.cardDetailedCardId);
  const newDescription = useRef()
  const moddifyDescription = useTrelloStore((state) => state.moddifyDescription)

  const handleModdifyDescription = (listDetailedCardId, cardDetailedCardId, newDescription) => {
    const description = newDescription.current.value
    moddifyDescription(listDetailedCardId, cardDetailedCardId, description)
    newDescription = ' '
  }

  return (
    <div className='flex justify-center py-20'>
      {listsArray.map((list) =>
        list.id === listDetailedCardId
          ? list.cards.map((card) =>
            card.id === cardDetailedCardId
              ? <div
                key={card.id}
                className='w-72 md:w-2/4 h-4/5 bg-slate-100 rounded-lg shadow-md shadow-slate-400 p-5 flex flex-col items-center justify-evenly gap-6'
              >
                <header className="md:w-3/5 flex flex-col items-center gap-2 bg-white w-full rounded-t-lg py-2">
                  <h1 className="text-3xl font-bold text-slate-700 font-serif">{card.title}</h1>
                  <h2 className="text-2xl text-slate-500 border border-slate-300 py-1 px-6 border-dashed rounded-lg border-2">in list: {list.title}</h2>
                </header>

                <div className="flex flex-col gap-3 h-4/5 p-2 w-full">
                  <span className="flex items-center gap-2">
                    <HiOutlineMenuAlt2 className="size-5 opacity-60" />
                    <h3 className="text-2xl font-semibold decoration-solid underline text-slate-600">Description</h3>
                  </span>

                  <div className="w-full border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-200">
                    <div className="px-2 py-2 bg-white rounded-t-md">
                      <textarea ref={newDescription} defaultValue={card.description} rows="4" className="w-full h-40 px-0 text-sm text-gray-900 bg-white border-0 focus:outline-none resize-none" placeholder="Write a description..."></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2">
                      <button onClick={() => handleModdifyDescription(listDetailedCardId, cardDetailedCardId, newDescription)} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Save the new description
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => toggleDetailedCardView()} className="inline-flex items-center py-2.5 px-4 text-lg font-bold text-center text-slate-700 bg-indigo-300 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-indigo-800 hover:text-slate-100 duration-75 ease-in-out">Save changes</button>
              </div>
              : null)
          : null)}
    </div>
  );
}

export default DetailedCard;
