const kolom = document.querySelectorAll(".kolom");
const x = document.querySelectorAll(".x");
const o = document.querySelectorAll(".o");
let container = document.querySelector(".container")
let hasil = document.querySelector(".hasil")

hasil.style.display = "none"

let arrayCheck = Array(9).fill(null);
let numIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let currentPlayer = "x"
let isPlayerTurn;
let isMultiPlayer;

function singlePlayer() {
    isPlayerTurn = true;
    hasil.style.display = "none"
    container.style.filter = "blur(0)";
    arrayCheck = Array(9).fill(null);
    numIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < arrayCheck.length; i++) {
        x[i].style.display = "none"
        o[i].style.display = "none"
    }
}

function multiPlayer() {
    isPlayerTurn = true;
    isMultiPlayer = true
    hasil.style.display = "none"
    container.style.filter = "blur(0)";
    arrayCheck = Array(9).fill(null);
    numIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < arrayCheck.length; i++) {
        x[i].style.display = "none"
        o[i].style.display = "none"
    }
}

function checkWinner(arr, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return arr[index] == player;
        });
    });
}

kolom.forEach((item) => {
    item.onclick = () => {
        if(isPlayerTurn == undefined) {
            hasil.style.backgroundColor = "gray"
            hasil.style.display = "block"
            hasil.style.color = "white"
            hasil.innerHTML = "KAMU BELUM MEMILIH TIPE PERMAINAN"
            return
        } else if (arrayCheck[item.id]) {return};

        if (currentPlayer === 'x') {
            x[item.id].style.display = "block";
            arrayCheck[item.id] = "x";
            let indexPlayer = numIndex.indexOf(Number(item.id))
            numIndex.splice(indexPlayer, 1)
        } else {
            o[item.id].style.display = "block";
            arrayCheck[item.id] = "o";
            indexPlayer = numIndex.indexOf(Number(item.id))
            numIndex.splice(indexPlayer, 1)
        }

        if (checkWinner(arrayCheck, currentPlayer)) {
            let message = currentPlayer === 'x' ? 'PLAYER X WINS!' : 'PLAYER O WINS!';
            let color = currentPlayer === 'x' ? 'rgba(0,255,0,.8)' : 'rgba(255,0,0,.8)';
            displayResult(message, color);
            return;
        }

        if (isMultiPlayer) {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';  // Ganti pemain
        } else if (!arrayCheck.every(cell => cell)) {
            makeBotMove();
        } else {
            displayResult('DRAW', 'rgba(255,255,0,.8)');
        }
    };
});


function makeBotMove() {
    setTimeout(() => {
        if (!arrayCheck.every(cell => cell)) {
            let bot = numIndex[Math.floor(Math.random() * numIndex.length)];
            let indexBot = numIndex.indexOf(bot);
            numIndex.splice(indexBot, 1);
            o[bot].style.display = "block";
            arrayCheck[bot] = "o";
            if (checkWinner(arrayCheck, 'o')) {
                displayResult('LOSE', 'rgba(255,0,0,.8)');
                return;
            }
            isPlayerTurn = true;
        } else {
            displayResult('DRAW', 'rgba(255,255,0,.8)');
        }
    }, 500);
}

function displayResult(message, color) {
    container.style.filter = "blur(5px)";
    hasil.style.backgroundColor = color;
    hasil.style.display = "block";
    hasil.innerHTML = message;
}


function tryAgain() {
    window.location.reload()
}