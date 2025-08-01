let currentPlayer = '✖️';
let gameOver = false;
let lastWinningCombo = null;

const winningCombos = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal TL to BR
        [2, 4, 6]  // diagonal TR to BL
];

function checkWin(playerSymbol) {
  for (let combo of winningCombos) {
    if (combo.every(index => {
      const btn = document.getElementById(index.toString());
      return btn.textContent === playerSymbol;
    })) {
      return combo;
    }
  }
  return null;
}

function progressBar(winningCombo) {
    return document.getElementsByClassName(winningCombo)[0];
}

// highlights player x or o
const xoButtons = document.querySelectorAll('.tttgame-buttons button');
xoButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentPlayer = button.textContent.trim();
    xoButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

const gameboardButtons = document.querySelectorAll('.gameboard-button');

gameboardButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.textContent === '' && !gameOver) {
      btn.textContent = currentPlayer;
      
      const winningCombo = checkWin(currentPlayer);

      // this is when game ends with a winner
      if (winningCombo) {
        lastWinningCombo = winningCombo;

        document.getElementById("modal-message").textContent = currentplayer + " Wins!"
        
        gameOver = true; 
       
        // add the slash effect
        document.getElementsByClassName("fake-progress-container")[0].className = "progress-container";
        document.getElementsByClassName("fake-progress progress-moved")[0].className = "progress progress-moved";
        document.getElementsByClassName("fake-progress-bar")[0].className = "progress-bar";

        if (["012", "345", "678"].includes(lastWinningCombo.join(""))) {
        // if the win is horizontal across
        progressBar("progress-bar").classList.add("win-" + lastWinningCombo.join(""));
        }
        // if the win is diagonal
        else if (["048","246"].includes(lastWinningCombo.join(""))) {
        progressBar("progress-container").classList.add("win-" + lastWinningCombo.join(""));
        }
        // if the win is vertical across 
        else if (["036", "147", "258"].includes(lastWinningCombo.join(""))) {
        progressBar("progress-container").classList.add("win-" + lastWinningCombo.join(""));
        }


        setTimeout(() => {
        document.getElementsByClassName("modal")[0].style.display = "block";
        }, 1500);


          return; // stop further code
        
      }

      const isBoardFull = Array.from(gameboardButtons).every(cell => cell.textContent !== '');

      if (isBoardFull) {
        gameOver = true;
        // Put “It’s a tie!” into your modal’s content
        document.getElementById("modal-message")[0].textContent = "It's a tie! 😲";
        // Show the modal
        document.getElementsByClassName("modal")[0].style.display = "block";
        return; // stop further code
      }
      
      currentPlayer = currentPlayer === '✖️' ? '⭕' : '✖️';
      document.getElementById("x").className = currentPlayer === '✖️' ? "active" : "inactive";
      document.getElementById("o").className = currentPlayer === '⭕' ? "active" : "inactive";
  }

  });
});

// resets gameboard
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
  gameboardButtons.forEach(btn => btn.textContent = '');
  currentPlayer = '✖️';
  gameOver = false;

  document.getElementById("x").className = "active";
  document.getElementById("o").className = "inactive";

  document.getElementById("modal-message").textContent = "Message Here";
  //document.getElementsByClassName("modal")[0].style.display = "none";
  // document.getElementByClassName("modal")[0].classList.add("out");

  //if (lastWinningCombo) {
    progressBar("progress-bar").classList.remove("win-" + lastWinningCombo.join(""));
    progressBar("progress-container").classList.remove("win-" + lastWinningCombo.join(""));
    lastWinningCombo = null;
  //}

  document.getElementsByClassName("progress-container")[0].className = "fake-progress-container";
  document.getElementsByClassName("progress progress-moved")[0].className = "fake-progress progress-moved";
  document.getElementsByClassName("progress-bar")[0].className = "fake-progress-bar";  

  document.getElementsByClassName("modal")[0].classList.add("out");
  document.getElementsByClassName("modal-content")[0].classList.add("slide-out");

//resets the modal classes 0.5 seconds after restart button is pressed
  setTimeout(() => {
  document.getElementsByClassName("modal")[0].classList.remove("out");
  document.getElementsByClassName("modal-content")[0].classList.remove("slide-out");
  document.getElementsByClassName("modal")[0].style.display = "none";
}, 500);

});