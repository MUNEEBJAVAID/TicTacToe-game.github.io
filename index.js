const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentplayer = "X";

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initGame() {
    currentplayer = "X";
    gameInfo.innerText = `Current Player - ${currentplayer}`;
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("win");
        box.style.pointerEvents = "all";
    });
    newGameBtn.classList.remove("active");
}

function swapTurn(currentTurn) {

    currentplayer = currentTurn === "X" ? "O" : "X";

    // UI Update
    gameInfo.innerText = `Current Player - ${currentplayer}`;
}

function checkGameOver() {

    let winnerPlayer = "";

    winningPositions.forEach((Element) => {
        if ((boxes[Element[0]].innerText != "" && boxes[Element[1]].innerText != "" && boxes[Element[2]].innerText != "") &&
            ((boxes[Element[0]].innerText === boxes[Element[1]].innerText) && (boxes[Element[1]].innerText === boxes[Element[2]].innerText))) {

            // Check Winner 
            winnerPlayer = boxes[Element[0]].innerText;

            // Now we know X/O is winner 
            Element.forEach(index => {
                boxes[index].classList.add("win");
            });

            // Disable pointers events
            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })
        }
    });

    // it means we have a winner

    if (winnerPlayer !== "") {
        gameInfo.innerText = `Winner is - ${winnerPlayer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Let's check game is Tie
    let fillCount = 0;
    boxes.forEach(box => {
        if (box.innerText != "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.innerText = `Game tied!`;
        newGameBtn.classList.add("active");
    }

}

function handleClick(boxIndex) {

    boxes[boxIndex].innerText = currentplayer;

    // Swap karo value ko   
    swapTurn(currentplayer);

    // check karo Jeet tu nai gaya 
    checkGameOver();
}

boxes.forEach((box, boxIndex) => {
    box.addEventListener('click', () => {
        if (box.innerText === "") {
            handleClick(boxIndex);
        } else {
            box.style.cursor = "default";
        }
    });
});

newGameBtn.addEventListener('click', () => {
    initGame();
})


