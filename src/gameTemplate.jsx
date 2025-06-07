import { useEffect, useState } from "react";
import "./App.css";
import Confetti from 'react-confetti'

// const pieces = [
//   "🎶",
//   "👻",
//   "👽",
//   // "🤖",
//   // "🐼",
//   // "🦄",
//   // "🐸",
//   // "🐈",
//   // "🐄",
//   // "🐘",
//   // "🐢",
//   // "🐳",
//   "🎶",
//   "👻",
//   "👽",
//   // "🤖",
//   // "🐼",
//   // "🦄",
//   // "🐸",
//   // "🐈",
//   // "🐄",
//   // "🐘",
//   // "🐢",
//   // "🐳",
// ];

function gameTemplate({onComplete, piecesArray, chanceLength, reset}) {
    
  const [wonGame, setWonGame] = useState(false);
  const [tryCount, setTryCount] = useState(1);
  const [levelCount, setLevelCount] = useState(0);
  const [pieces, setpieces] = useState([]);
  const [shuffledPieces, setshuffledPieces] = useState([]);
  useEffect(()=>{
      setLevelCount(levelCount+1);
      startGame();
    },[piecesArray])

    const startGame = () => { 
    setTryCount(chanceLength);
    setWonGame(false);
    const piecesCopy = [...piecesArray,...piecesArray];
    console.log("dupli", piecesCopy)
    const shuffling = [];
    while (piecesCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * piecesCopy.length);
      shuffling.push({
        emoji: piecesCopy[randomIndex],
        active: false,
        solved: false,
        position: shuffling.length,
      });
      piecesCopy.splice(randomIndex, 1);
    }
    setshuffledPieces(shuffling);
  };
  const handleChange = (data) => {
        const flippedPiecess = shuffledPieces.filter((data)=>{
      return data.active && !data.solved })
      if(flippedPiecess.length == 2) return;
    const newPiece = shuffledPieces.map((piece)=>{
      if(piece.position === data.position){
        piece.active = !piece.active;
      }
      return piece;
    })
    setshuffledPieces(newPiece);
    console.log(data) 
  }   

  const gameLogic = () =>{
    const flippedPieces = shuffledPieces.filter((data)=>{
      return data.active && !data.solved
    })
    if(flippedPieces.length === 2){
      console.log(flippedPieces.length)
      setTimeout(()=>{
        if(flippedPieces[0].emoji === flippedPieces[1].emoji){
          const solveUpdate = shuffledPieces.map((data)=>{
            if( data.position === flippedPieces[0].position ||
            data.position === flippedPieces[1].position){
            
             data.solved = true;
             return data;
            
            }
            return data;
          })
          setshuffledPieces(solveUpdate)
        }else{
          setTryCount(tryCount-1)
          const Update = shuffledPieces.map((data)=>{
           if( data.position === flippedPieces[0].position ||
            data.position === flippedPieces[1].position){
            
             data.active = !data.active;
             return data;
            
            }
            return data;
          })
          setshuffledPieces(Update)
          console.log(shuffledPieces)

        }
      },800)
    }
  }

  const winningMSg = () =>{
    const check = shuffledPieces.length > 0 && shuffledPieces.every(data=> data.solved);
    if(check && !wonGame){
      setWonGame(true);
      // alert("YOU WONN!!");
      // window.location.reload();
      }
    }

    const resetGame = () =>{
        setLevelCount(0);
    }

  useEffect(()=>{
    gameLogic();
    winningMSg();
    console.log(1)
  },[shuffledPieces])

  return (
    <main>
      <h3>Memory Game - Level {levelCount} Chances left {tryCount}</h3>
      {tryCount > 0 &&  levelCount <= 4 &&  <div className="conteiner">
        {shuffledPieces.map((data, index) => {
          return (
            <div className="parent-box">
              <div className={`box-back ${data.active ? "flipped" : ""}`} key={index} onClick={() => handleChange(data)}></div>
              <div className="box-front">
                <h1>{data.emoji}</h1>
              </div>
            </div>
          );
        })}
      </div>}
      {wonGame && (
        <div>
            <h1>Level Fineshed!{levelCount}</h1>
          {levelCount < 4 && <button className="finished" onClick={()=>{
            console.log(levelCount, "current level")
            onComplete(levelCount);
          }}>Go to Next Level📈🔥</button>}
           {levelCount === 4 && 
          <button className="finished" onClick={()=>{
            reset();
            resetGame();
          }}>Play Again🔁</button>}
          <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />
        </div>
      )}
      {tryCount === 0 && (
        <div>
          <h2>Sorry..you Loose</h2>
          <button onClick={()=> startGame()}>Try Again</button>
        </div>
      )}
    </main>
  );
}

export default gameTemplate;
