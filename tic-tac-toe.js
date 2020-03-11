const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const updateBoard = (position, player) => {
        if(board[position] === ""){
            board[position] = player.getMark;
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
    let lastPlayer;
    let nextPlayer;

    const getLastPlayer = () => {
        return lastPlayer;
    }
    
    const getNextPlayer = () => {
        return nextPlayer;
    }

    const setLastPlayer = (player) => {
        lastPlayer = player;
    }
    
    const setNextPlayer = (player) => {
        nextPlayer = player;
    }

    const updateDisplay = (pos, mark) => {
        // get display and change innerHtml according to mark
    }

    const clean = () => {
        let gridItems = document.getElementsByClassName("grid-item");
        for(let key in Object.keys(gridItems)) {
            gridItems[key].innerHTML = "";
        }
    }

    return {getLastPlayer, getNextPlayer, setLastPlayer, setNextPlayer, updateDisplay, clean};
})();

displayController.clean();