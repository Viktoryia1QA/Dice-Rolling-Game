'use strict';

const generateRandomNumber = function (min = 1, max = 6) {
    return Math.trunc(Math.random() * (max - min + 1)) + min
};

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    firstPlayer.classList.toggle('player--active');
    secondPlayer.classList.toggle('player--active');
};

const firstScore = document.querySelector('#score--0');
const secondScore = document.getElementById('score--1');
const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');
const currentFirstPlayer = document.getElementById('current--0');
const currentSecondPlayer = document.getElementById('current--1');

const dicePic = document.querySelector('.dice');
// btns
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// starting conditions
const initState = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    firstScore.textContent = 0;
    secondScore.textContent = 0;
    currentFirstPlayer.textContent = 0;
    currentSecondPlayer.textContent = 0;

    dicePic.classList.add('hidden');
    firstPlayer.classList.add('player--active');
    secondPlayer.classList.remove('player--active');
    firstPlayer.classList.remove('player--winner');
    secondPlayer.classList.remove('player--winner');
}

initState();

// rolling dice functionality
rollDiceBtn.addEventListener('click', function () {
    if (playing) {
        const diceNumber = generateRandomNumber();
        dicePic.classList.remove('hidden');
        dicePic.src = `dice-${diceNumber}.png`;

        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

holdBtn.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            dicePic.classList.add('hidden');
        }
        switchPlayer();
    }
})

newGameBtn.addEventListener('click', initState);
