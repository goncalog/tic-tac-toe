const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const updateBoard = (pos, mark) => {
        if(board[pos] === ""){
            board[pos] = mark;
            displayController.update(pos, mark);
            displayController.changePlayers();
        } else {
            alert('Please pick a new spot.');
        }
    }

    return {updateBoard};
})();

const Player = (name, mark) => {
    const getName = () => {
        return name;
    }

    const getMark = () => {
        return mark;
    }

    return {getName, getMark};
}

const displayController = (() => {
    let currentPlayer;
    let nextPlayer;

    const getCurrentPlayer = () => {
        return currentPlayer;
    }
    
    const getNextPlayer = () => {
        return nextPlayer;
    }

    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }
    
    const setNextPlayer = (player) => {
        nextPlayer = player;
    }

    const update = (pos, mark) => {
        let gridItems = document.getElementsByClassName("grid-item");
        gridItems[pos].innerHTML = mark;
    }

    const restart = () => {
        let gridItems = document.getElementsByClassName("grid-item");
        for(let key in Object.keys(gridItems)) {
            gridItems[key].innerHTML = "";
        }
        clickEvent();
    }

    const clickEvent = () => {
        let gridItems = document.getElementsByClassName("grid-item");
        for(let key in Object.keys(gridItems)) {
            gridItems[key].addEventListener("click", function() {
                gameBoard.updateBoard(this.id, displayController.getCurrentPlayer().getMark());
            });
        }
    }

    const changePlayers = () => {
        let nextPlayer = displayController.getCurrentPlayer();
        displayController.setCurrentPlayer(displayController.getNextPlayer());
        displayController.setNextPlayer(nextPlayer);
    }

    return {getCurrentPlayer, getNextPlayer, setCurrentPlayer, setNextPlayer, update, restart, changePlayers};
})();

const playerX = Player("playerX", "X");
displayController.setCurrentPlayer(playerX);
const playerO = Player("playerO", "O");
displayController.setNextPlayer(playerO);

displayController.restart();