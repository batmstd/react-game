import * as React from "react";
import { useState } from "react";

interface Cards {
  value: number;
  visible: boolean;
}

const changeVisible = (cards: Array<Cards>, id: number, val: boolean) =>
  cards.map((el, i) =>
    i === id
      ? {
          ...el,
          visible: val
        }
      : el
  );

const findForSelected = (cards: Array<Cards>, value: number) =>
  cards.map(c =>
    c.value === value
      ? {
          ...c,
          visible: true
        }
      : c
  );

const Game: React.FC = () => {
  const [cards, setCards] = useState(generateCards());
  const [selected, setSelected] = useState({ id: 0, value: 0 });
  const [currentClick, setCurrentClick] = useState(-1);
  const click = (event: React.FormEvent<HTMLButtonElement>) => {
    const id = Number((event.target as any).id);
    const value = cards.filter((r, i) => i === id)[0].value;
    if (currentClick === value) {
      return;
    }
    setCurrentClick(value);
    setCards(cards => changeVisible(cards, id, true));
    setSelected({ id, value });
    if (selected.value === value && selected.id !== id) {
      setInterval(() => setCards(cards => findForSelected(cards, value)), 1);
    } else {
      setTimeout(
        () => setCards(cards => changeVisible(cards, id, false)),
        2000
      );
      setCurrentClick(-1);
    }
  };

  return (
    <div className="cards">
      {cards.map((el, i) => (
        <button
          key={i}
          className={el.visible ? "select" : "card"}
          onClick={click}
          id={i + ""}
        >
          {el.visible ? el.value : "?"}
        </button>
      ))}
    </div>
  );
};

const generateCards = () => {
  const arr: Array<number> = [];
  for (let i: number = 1; i <= 10; i++) {
    arr.push(i);
    arr.push(i);
  }
  return shuffle(arr).map(el => ({ value: el, visible: false }));
};

const shuffle = (arr: Array<number>) => {
  let j: number, temp: number;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

export default Game;
