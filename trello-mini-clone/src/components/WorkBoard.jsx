import React from "react";
import List from "./List";
import useTrelloStore from "../store/trelloStore";

function WorkBoard () {
  const listId = useTrelloStore(state => state.listId);
  const cardId = useTrelloStore(state => state.cardId);
  const listsArray = useTrelloStore(state => state.listsArray);
  const addList = useTrelloStore(state => state.addList);
  const removeList = useTrelloStore(state => state.removeList);
  const edditListtitle = useTrelloStore(state => state.edditListtitle);
  const addCard = useTrelloStore(state => state.addCard);
  const removeCard = useTrelloStore(state => state.removeCard);
  const edditCardTitle = useTrelloStore(state => state.edditCardTitle);
  const moveCard = useTrelloStore(state => state.moveCard);
  const copyCard = useTrelloStore(state => state.copyCard);

  const handleAddList = () => {
    addList(listId);
  };

  return (
    <div className='w-screen flex gap-2 flex-wrap items-start ml-4 mb-4'>
      {
        listsArray?.map((list) => {
          return (
            <List key={list.id} id={list.id} title={list.title} cardsArray={list.cards} removeList={removeList} edditListtitle={edditListtitle} cardId={cardId} addCard={addCard} removeCard={removeCard} edditCardTitle={edditCardTitle} moveCard={moveCard} copyCard={copyCard} />
          );
        })
      }

      <button onClick={handleAddList} className='bg-sky-400 rounded-sm text-center text-white hover:bg-sky-700 duration-75 ease-in-out px-4 py-1 h-10 font-semibold'>+ Add list</button>
    </div>
  );
}

export default WorkBoard;
