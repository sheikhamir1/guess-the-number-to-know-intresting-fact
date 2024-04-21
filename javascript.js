
let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(`first random number is ${randomNumber}`);
const submit = document.querySelector('#subt');
//  this is submit button
const userInput = document.querySelector('#guessField');
// this is user input field for guessing number 
const guessSlot = document.querySelector('.guesses');
// this is where the previous guesses will be displayed in the form of a list of numbers 
const remaining = document.querySelector('.lastResult');
// this is the remaining guesses left 
const lowOrHi = document.querySelector('.lowOrHi');
// this is where the message will be displayed if the guess is too high or too low 
const startOver = document.querySelector('.resultParas');
// this is where the new game button will be displayed 
const body = document.querySelectorAll('body')[0];
const second_body = document.querySelectorAll('#wrapper')[0]
const heading = document.querySelector('h1');
const heading2 = document.querySelector('label2');
const text = document.querySelector('.text');
const all_p = document.querySelectorAll('p');
// console.log(all_p);
const audio_fail = document.querySelector('#audio_fail');
const looser = document.querySelector('#looser');
const tada = document.querySelector('#tada');
const congo = document.querySelector('#congo');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 0;



function play() {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
    color(guess);

  });
}
play()



function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('PLease enter a number 🤨');
  } else if (guess < 1) {
    alert('PLease enter a number more than 1 😊');
  } else if (guess > 100) {
    alert('PLease enter a  number less than 100 😊');
  }
  else {
    prevGuess.push(guess);
    if (numGuess === 9) {
      submit.disabled = true;
      displayGuess(guess);
      displayMessage(`oops! you failed to found the random number 🤦‍♂️, try next time 😢`);
      looser.play()
      endGame();
    } else {
      show_text(``);
      displayGuess(guess);
      // numGuess++;
      checkGuess(guess);
    }
  }
}


function color(guess) {
  if (numGuess === 1 && guess !== randomNumber) {
    body.style.backgroundColor = '#4842f5';
    second_body.style.backgroundColor = '#4842f5';
    heading.style.backgroundColor = '#4842f5';
    show_text(`oops you miss first chance! 😅`)

  } else if (numGuess === 3 && guess !== randomNumber) {
    body.style.backgroundColor = '#42f5f5';
    second_body.style.backgroundColor = '#42f5f5';
    heading.style.backgroundColor = '#42f5f5';
    show_text(`you missed it again! 😓`)
    for (let i = 0; i < all_p.length; i++) {
      all_p[i].style.color = 'black';
    }
    heading2.style.color = 'black';
    heading.style.color = 'black';
    remaining.style.color = 'black';
  } else if (numGuess === 7 && guess !== randomNumber) {
    body.style.backgroundColor = '#f5ec42';
    second_body.style.backgroundColor = '#f5ec42';
    heading.style.backgroundColor = '#f5ec42';
    show_text(`you have only left 4 chance! 😶`)
    for (let i = 0; i < all_p.length; i++) {
      all_p[i].style.color = 'black';
    }
    heading2.style.color = 'black';
    heading.style.color = 'black';
    remaining.style.color = 'black';

  } else if (numGuess === 9 && guess !== randomNumber) {
    body.style.backgroundColor = '#f58742';
    second_body.style.backgroundColor = '#f58742';
    heading.style.backgroundColor = '#f58742';
    show_text(`you have only left 1 chance! 😮`)
    for (let i = 0; i < all_p.length; i++) {
      all_p[i].style.color = 'black';
    }
    heading2.style.color = 'black';
    heading.style.color = 'black';
    remaining.style.color = 'black';

  } else if (numGuess === 10 && guess !== randomNumber) {
    body.style.backgroundColor = '#f00c0c';
    second_body.style.backgroundColor = '#f00c0c';
    heading.style.backgroundColor = '#f00c0c';
    for (let i = 0; i < all_p.length; i++) {
      all_p[i].style.color = 'white';
    }
    heading2.style.color = 'white';
    heading.style.color = 'white';
    remaining.style.color = 'white';
    show_text(``)
  }
}



function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  if (numGuess !== 10) {
    numGuess++;
  }
  remaining.innerHTML = `${10 - numGuess} `;
}



function checkGuess(guess) {
  if (guess === randomNumber) {
    tada.play();
    congo.play();
    show_text(``)
    submit.disabled = true;
    displayMessage(`congratulations correct guess! 😀👍${randomNumber} Fact did you know 🤔: 2024 is a leap year`);
    endGame(guess);
  } else if (guess < randomNumber) {
    displayMessage(`Number is TOOO low 👎`);
    audio_fail.play();
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOOO High 😐`);
    audio_fail.play();
  }
}


function displayMessage(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function show_text(show_text) {
  text.innerHTML = `<h3>${show_text}</h3>`

}

function endGame(guess) {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  submit.desibled = true;
  p.classList.add('button');
  if (guess === randomNumber) {
    p.innerHTML = `<h2 id="newGame">Start new Game 😉</h2>`;
  }
  else {
    p.innerHTML = `<h2 id="newGame">Play again and try your luck 🤗</h2>`;
  }

  startOver.appendChild(p);
  newGame();
}


function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    // console.log(`second random number is ${randomNumber}`);
    prevGuess = [];
    numGuess = 0;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${10 - numGuess} `;
    displayMessage(`get ready for playing again 😎`);
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    submit.disabled = false;
    body.style.backgroundColor = 'black';
    second_body.style.backgroundColor = 'black';
    heading.style.backgroundColor = 'black';
    for (let i = 0; i < all_p.length; i++) {
      all_p[i].style.color = 'white';
    }
    heading2.style.color = 'white';
    heading.style.color = 'white';
    remaining.style.color = 'white';

  });
}




