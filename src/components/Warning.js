import {Word} from "./Word.js"
export function randomWord(){
    const randomIndex= Math.floor(Math.random()*Word.length)
    return Word[randomIndex]
}
export function Warning(){
    const options=[
        "oops, missed it!","Try again, champ.","Bold. Wrong, but bold.",
"Nice try… kinda.","Not even close lol.","Almost! (No you weren't.)","Respectfully… no.",
"Who told you to pick that?","Good guess! (It wasn't.)","Interesting choice…","Keyboard disagrees."

    ]
    const randomIndex = Math.floor(Math.random()*options.length);
    return options[randomIndex];
}


