import { useState } from 'react'
import GameTemplate from './gameTemplate'
import { use } from 'react';

export default function App() {

  const [piecesDB,setPieces] = useState([
  "🎶",
  "👻",
  "👽",
  "🤖",
  "🐼",
  "🦄",
  "🐸",
  "🐈",
  "🐄",
  "🐘",
  "🐢",
  "🐳",
  "👿",
  "👺",
  "🐰",
  "🦘",
  "🦥",
  "🦕",
  ])

  const [arrayLength, setarrayLength] = useState(2);
  const [chanceLength,setChanceLength] = useState(3);
  const [level, setLevel] = useState();
  
  
  const completeLevel = (level) =>{
    setarrayLength(arrayLength * 2 );
    console.log(level, "from app");
    setLevel(level);
    setChanceLength(arrayLength * 7)
  }

  const reset=()=>{
    setChanceLength(3);
    setarrayLength(2);
    setLevel(1);
  }
  
  const pieces = piecesDB.slice(0,arrayLength);
  return (
    <>
      <GameTemplate onComplete={completeLevel} piecesArray={pieces} chanceLength={chanceLength} reset={reset}/>
    </>
  )
}
