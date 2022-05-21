import React, { useState, useEffect } from "react"; 
import SingleCard from "./components/SingleCard";


const cardImages = [
  { "src": "/img/Black_Panther.png", matched: false },
  { "src": "/img/Cap-Shield.png", matched: false },
  { "src": "/img/Hulk.png", matched: false },
  { "src": "/img/Iron-Man-2.png", matched: false },
  { "src": "/img/Spidey.png", matched: false },
  { "src": "/img/Thor-Hammer.png", matched: false }
]
const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledcards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledcards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000
        )}
    }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() =>  {
    shuffleCards()
  }, [])

  return(
    <div className="App">
      <h1 className="avenger">Mighty Avengers</h1>

      <p className="game-title">Memory Game</p>
      
    
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <SingleCard
               key={card.id}
               card={card}
               handleChoice={handleChoice}
               flipped={card === choiceOne || card === choiceTwo || card.matched}
               disabled={disabled} 
             />
          </div>
        ))}
      </div>
      <p className="turn">Turns : {turns}</p>
    </div>
  )
}

export default App;
