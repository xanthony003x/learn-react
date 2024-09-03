import React from "react";
import BoardTitle from "./BoardTitle";
import WorkBoard from "./WorkBoard";
import DetailedCard from "./DetailedCard";
import useTrelloStore from "../store/trelloStore";

function Board() {
  const showDetailedCard = useTrelloStore(state => state.showDetailedCard);

  return (
    <>
      {!showDetailedCard
        ? <div className='w-screen flex flex-col gap-3 mt-4'>
          <BoardTitle />
          <WorkBoard />
        </div>
        :
        <DetailedCard />}
    </>
  );
}

export default Board;
