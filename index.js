const roulette = document.getElementById("rouletteImage");
const betInput = document.getElementById("betInput");
const guessInput = document.getElementById("guessInput");
const gameState = document.getElementById("gameState");
const moneyDisplay = document.getElementById("money");
const rouletteSound = new Audio("rouletteSound.mp3");
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");

let money = 1000;
betInput.setAttribute("max",money);
moneyDisplay.innerHTML = `$${money}`;

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

const numRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const numBlack = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

async function roll(guessMode){

    let bet = betInput.value;
    let guessedNumber = guessInput.value;

    money -= bet;
    moneyDisplay.innerHTML = `$${money}`;
    let rolledNumber = Math.trunc(Math.random() * 36)+ 0;

    function win(amount){
        gameState.innerHTML = `${rolledNumber}, win!`;
        winSound.play();
        bet *= amount;
        money += bet;
        moneyDisplay.innerHTML = `$${money}`;
    }
    
    function lose(){
        gameState.innerHTML = `${rolledNumber}, lost!`;
        loseSound.play();
        moneyDisplay.innerHTML = `$${money}`;
    }

    if(money >= 0){
        roulette.src="roulette2.gif";
        rouletteSound.play();
        await sleep(3041);
        roulette.src = "rouletteStill.png";
    
        if(guessMode == 'number'){
            if(guessedNumber == rolledNumber){
                win(35);   
            }
            else{
               lose();
            }        
        }
        else if(guessMode == 'even'){
            if(rolledNumber % 2 == 0 && rolledNumber != 0){
                win(2);
            }
            else{
                lose();
            }
        }
        else if(guessMode == 'odd'){
            if(rolledNumber % 2 != 0){
                win(2);
            }
            else{
                lose();
            }
        }
        else if(guessMode == 'red'){
            if(numRed.includes(rolledNumber)){
                win(2);
            }
            else{
                lose();
            }
        }
        else if (guessMode == 'black'){
            if(numBlack.includes(rolledNumber)){
                win(2);
            }
            else{
                lose();
            }
        }

    moneyDisplay.innerHTML = `$${money}`;
    betInput.setAttribute("max",money);
    
    }
    else{
        gameState.innerHTML = "out of money";
        moneyDisplay.innerHTML = "$0";
    }
}
