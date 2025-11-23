import React from "react"
import { randomWord } from "./components/Warning"
import clsx from "clsx"
import { Warning } from "./components/Warning"
import Confetti from "react-confetti"

export default function App() {
  const [currentWord,setCurrentWord]=React.useState(()=>randomWord())
  const letters=currentWord.split("");

  const [gusses,setGusses]=React.useState([])

  const alphabet ="abcdefjhigklmnopqrstuvwxyz"
  const alphabetarray=alphabet.split("")

  const WrongGussCount=gusses.filter(letter=> !currentWord.includes(letter)).length;
  
  const isGameWon= letters.every(item=>gusses.includes(item))
  const isGameLost=WrongGussCount >= 8
  const isGameOver= isGameLost || isGameWon

  const lastGuss=gusses[gusses.length-1]
  const isLastGussIncurrent=lastGuss && !currentWord.includes(lastGuss)
  
  

   function addGuss(item){
    setGusses(prev=>prev.includes(item) ?prev:[...prev,item])
  }
  
  
  const keyboard= alphabetarray.map(item=>{
    const isgussed=gusses.includes(item)
    const iscurrect= isgussed && letters.includes(item)
    const iswrong= isgussed && !letters.includes(item)
    const className=clsx("alphabetBtn",{
      "currect" :iscurrect, 
      "wrong" :iswrong,
    "disableKeyboard":isGameOver})
    
    return(
    <button 
    key={item} 
    value={item}
    className={className}
    disabled={isGameOver}
    aria-disabled={gusses.includes(item)}
    aria-label={`item ${item}`}
    onClick={()=>addGuss(item)}

    >{item.toUpperCase()}</button>)
  })
  
  const allLetters = letters.map((item,index)=>(
    <span className={clsx("letter",{"CurrectWordReveal":isGameLost}) }
    key={index}
    >{gusses.includes(item)|| isGameLost ? item.toUpperCase():""}</span>))

  const fullHeart = "full-heart.png"
  const brokenHeart = "broken-grey-heart.png"

  const hearts = Array.from({length:8}).map((_,index)=>(
    <img
    className="heart"
    key={index} 
    src={index < WrongGussCount? brokenHeart : fullHeart} 
    alt="heart" />
  ))
  
  function reset(){
    setCurrentWord(randomWord())
    setGusses([])
  }
  
  return(
    <>
    {isGameWon && <Confetti 
    recycle={false}
    numberOfPieces={3000}
    />}
    <main>
      <header>
        <h1>WordPop</h1>
        <p>pick your letters and uncover the hidden word. every wrong guess cracks a heart. lose the all eight and it's game over :)</p>
      </header>
      <section 
      aria-live="polite"  
      role="status" 
      className={clsx("message",{"win":isGameWon,"lose":isGameLost})}>
         {isLastGussIncurrent && !isGameOver? <p className="Warning"><Warning /></p>:""}
        {isGameWon &&<div>
         <h2>you win!</h2>
         <p>well done</p>
         </div>}
         {isGameLost &&<div>
         <h2>you lost!</h2>
         <p>terrible</p>
         </div>}
      </section>
      <section className="hearts-container">
        {hearts}
      </section>
      <section className="word-container">
        {allLetters}
      </section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuss)? 
          `currect! the letter ${lastGuss} is in the word!`:
          `sorry. the letter ${lastGuss} is not in the word.`}
        </p>
        <p>current word:{letters.map(letter => gusses.includes(letter)? letter +".":"blank.").join(" ")}</p>
      </section>
      <section className="keyboard">
        {keyboard}
      </section>
      {isGameOver &&
      <button 
      className="newgame-btn" 
      onClick={reset}
      >New Game</button>}
    </main>
    </>
  )
}


