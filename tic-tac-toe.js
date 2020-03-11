const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const updateBoard = (pos, mark) => {
        if(game.getIsOver()){
            alert('Please start a new game.');
        } else {
            if(board[pos] === ""){
                board[pos] = mark;
                displayController.update(pos, mark);
                game.checkWinner(board, mark);
            } else {
                alert('Please pick a new spot.');
            }
        }
    }

    const restart = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    const get = () => {
        return board;
    }

    return {updateBoard, restart, get};
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
        setCurrentPlayerDisplay();
    }

    const setCurrentPlayerDisplay = () => {
        document.getElementById("message").innerHTML = `Current player: ${currentPlayer.getMark()}`;
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
    }

    const changePlayers = () => {
        let nextPlayer = displayController.getCurrentPlayer();
        displayController.setCurrentPlayer(displayController.getNextPlayer());
        displayController.setNextPlayer(nextPlayer);
    }

    const setWinnerDisplay = () => {
        document.getElementById("message").innerHTML 
                = `Congrats, ${currentPlayer.getName()} won!`;
    }

    const setDrawDisplay = () => {
        document.getElementById("message").innerHTML 
                = `It's a draw!`;
    }

    return {getCurrentPlayer, getNextPlayer, setCurrentPlayer, setNextPlayer, 
                update, restart, changePlayers, setWinnerDisplay, setDrawDisplay};
})();

const game = (() => {
    let isOver = false;

    const start = (player1, player2) => {
        isOver = false;
        
        const playerX = Player(player1, "X");
        displayController.setCurrentPlayer(playerX);

        const playerO = Player(player2, "O");
        displayController.setNextPlayer(playerO);
        
        displayController.restart();
        gameBoard.restart();
    }

    const checkWinner = (board, mark) => {
        let isWinner = false;
        if(board[0] === board[1] && board[0] === board[2] && board[0] === mark){
            isWinner = true;
        } else if(board[3] === board[4] && board[3] === board[5] && board[3] === mark){
            isWinner = true;
        } else if(board[6] === board[7] && board[6] === board[8] && board[6] === mark){
            isWinner = true;
        } else if(board[0] === board[3] && board[0] === board[6] && board[0] === mark){
            isWinner = true;
        } else if(board[1] === board[4] && board[1] === board[7] && board[1] === mark){
            isWinner = true;
        } else if(board[2] === board[5] && board[2] === board[8] && board[2] === mark){
            isWinner = true;
        } else if(board[0] === board[4] && board[0] === board[8] && board[0] === mark){
            isWinner = true;
        } else if(board[2] === board[4] && board[2] === board[6] && board[2] === mark){
            isWinner = true;
        }

        if(isWinner){
            displayController.setWinnerDisplay();
            isOver = true;
        } else {
            checkDraw(board);
        }
    }

    const checkDraw = (board) => {
        let isDraw = true;

        board.forEach(e => {
            if(e === ""){
                isDraw = false;
            }
        });

        if(isDraw){
            displayController.setDrawDisplay();
            isOver = true;
        } else {
            displayController.changePlayers();
        }
    }

    const getIsOver = () => {
        return isOver;
    }

    return {start, checkWinner, getIsOver}
})();

const newGameButton = (() => {
    document.getElementById("new-game").addEventListener("click", function() {
        document.getElementById("players").style.visibility = "visible";
        document.getElementById("new-game").style.visibility = "hidden";
        document.getElementById("message").innerHTML = "";
    });
})();

const submitForm = (() => {
    document.getElementById("submit-form").addEventListener("click", function() {
        event.preventDefault();
        let form = document.getElementById("players");
        form.style.visibility = "hidden";
        document.getElementById("new-game").style.visibility = "visible";
        game.start(form.player1.value, form.player2.value);
    });
})();

const clickEvents = (() => {
    let gridItems = document.getElementsByClassName("grid-item");
    for(let key in Object.keys(gridItems)) {
        gridItems[key].addEventListener("click", function() {
            gameBoard.updateBoard(this.id, displayController.getCurrentPlayer().getMark());
        });
    }
})();