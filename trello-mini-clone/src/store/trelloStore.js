import { create } from "zustand";

const trelloStore = (set, get) => ({
  listId: 3,
  cardId: 1,
  showDetailedCard: false,
  listDetailedCardId: 0,
  cardDetailedCardId: 0,

  listsArray: [
    {
      id: 0,
      title: "To Do",
      cards: [
        {
          id: 0,
          title: "Default card title",
          description: "Default card description",
        }
      ]
    },
    {
      id: 1,
      title: "Doing",
      cards: []
    },
    {
      id: 2,
      title: "Done",
      cards: []
    }
  ],
  addList: (id) => {
    set((state) => ({
      listsArray: [...state.listsArray, { id, title: "Default list title", cards: [] }],
      listId: state.listId + 1
    }));
  },
  removeList: (id) => {
    const listsArray = get().listsArray;
    const removeList = listsArray?.filter((list) => list.id !== id);
    set(() => ({ listsArray: removeList }));
  },
  edditListtitle: (id, title) => {
    const listsArray = get().listsArray;
    const edditListTitle = listsArray?.map((list) => {
      if (list.id === id) {
        return { ...list, title };
      } else { return list; }
    });
    set(() => ({ listsArray: edditListTitle }));
  },
  addCard: (listId, cardId) => {
    set((state) => ({
      listsArray: state.listsArray?.map((list) =>
        list.id === listId
          ? {
            ...list,
            cards: [...list.cards, {
              id: cardId,
              title: "Default card title",
              description: "Default card description",
            }]
          }
          : list),
      cardId: state.cardId + 1
    }));
  },
  removeCard: (listId, cardId) => {
    set((state) => ({
      listsArray: state.listsArray?.map((list) => list.id === listId ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) } : list)
    }));
  },
  edditCardTitle: (listId, cardId, title) => {
    set((state) => ({
      listsArray: state.listsArray?.map((list) => list.id === listId ? { ...list, cards: list.cards.map((card) => card.id === cardId ? { ...card, title } : card) } : list)
    }));
  },
  moveCard: (sourceListId, targetListId, cardId) => {
    set((state) => {
      const sourceList = state.listsArray.find((list) => list.id === sourceListId);

      const cardToMove = sourceList.cards.find((card) => card.id === cardId);

      if (!cardToMove) return state;

      return {
        listsArray: state.listsArray.map((list) => {
          if (list.id === sourceListId) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId)
            };
          } else if (list.id === targetListId) {
            return {
              ...list,
              cards: [...list.cards, cardToMove]
            };
          } else {
            return list;
          }
        })
      };
    });
  },
  copyCard: (sourceListId, targetListId, cardId) => {
    set((state) => {
      const sourceList = state.listsArray.find((list) => list.id === sourceListId);
      const cardToCopy = sourceList.cards.find((card) => card.id === cardId);

      if (!cardToCopy) return state;

      const copiedCard = { ...cardToCopy, id: Date.now() };

      return {
        listsArray: state.listsArray.map((list) =>
          list.id === targetListId
            ? {
              ...list,
              cards: [...list.cards, copiedCard]
            }
            : list
        )
      };
    });
  },
  passDataToDetailedCard: (listId, cardId) => {
    const LISTID = listId;
    const CARDID = cardId;
    set(() => ({ listDetailedCardId: LISTID, cardDetailedCardId: CARDID }));
  },
  toggleDetailedCardView: () => {
    set((state) => ({ showDetailedCard: !state.showDetailedCard }));
  },
  moddifyDescription: (listId, cardId, description) => {
    set((state) => ({
      listsArray: state.listsArray?.map((list) => list.id === listId ? { ...list, cards: list.cards.map((card) => card.id === cardId ? { ...card, description } : card) } : list)
    }))
  }
});

const useTrelloStore = create(trelloStore);
export default useTrelloStore;
