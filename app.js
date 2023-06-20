
// guess - предполагать
// remaining - расширяющийся


const submit = document.querySelector('.guess-btn');
const userInput = document.querySelector('.guess-field');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.last-result');
const totalLevels = document.querySelector('.total-lives'); // количство попыток
const startOver = document.querySelector('.guess-field');
const hint = document.querySelector('.hint');

const minNumber = document.querySelector('.min-number');
const maxNumber = document.querySelector('.max-number');

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const MAX_ATTEMPTS = 10;

minNumber.textContent = MIN_NUMBER;
maxNumber.textContent = MAX_NUMBER;
remaining.textContent = MAX_ATTEMPTS;
totalLevels.textContent = MAX_ATTEMPTS;

let randomNumber = getRandomNumber(MIN_NUMBER,MAX_NUMBER);
console.log(randomNumber);
function getRandomNumber(min,max){
    return Math.floor(Math.random() * ( max - min + 1)) + min;
}

let playGame = true;
let previousGuesses = [];

if(playGame){
    submit.addEventListener("click",
        function (e){
            e.preventDefault();
            //console.log(e.target);
            const guess = +userInput.value;
            console.log(guess);
            validateGuess(guess);
        })
}
function validateGuess(guess){
    if (isNaN(guess)){
        alert("Пожалуйста, введите корректное число!");
    } else if(guess < MIN_NUMBER){
        alert(`Пожалуйста введите число больше ${MIN_NUMBER}`);
    } else if(guess > MAX_NUMBER){
        alert(`Введите число меньше ${MAX_NUMBER}`);
    } else{
        checkGuess(guess);
    }
}
function checkGuess(guess){
    addGuesses(guess);
    if(guess === randomNumber){
        displayMessage('Ура ты победил!');
    } else if( guess !== randomNumber && previousGuesses.length === MAX_ATTEMPTS){
        displayMessage('Ты проиграл!');
    } else if( guess < randomNumber){
        displayMessage('Загаданое число больше текущего!');
    } else if( guess > randomNumber){
        displayMessage('Загаданое число меньше текущего!');
    }
}
function displayMessage(message){
    hint.innerHTML = `<h1>${message}</h1>`;
}

function addGuesses(guess){
    userInput.value = "";
    console.log(guess)
    previousGuesses.push(guess);
    console.log(previousGuesses)
    guessSlot.textContent = previousGuesses;
    remaining.textContent = MAX_ATTEMPTS - previousGuesses.length;
}

function endGame(){
    userInput.setAttribute("disabled", "");
    submit.setAttribute("disabled","");

    createNewGameButton.classList.add('new-game-btn');
    createNewGameButton.textContent = "Начать снова";
    startOver.append(createNewGameButton);
    playGame = false;
}
