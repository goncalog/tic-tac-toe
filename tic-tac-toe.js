let gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const updateBoard = (position, player) => {
        if(board[position] === ""){
            board[position] = player.mark;
        } else {
            alert('Please pick a new spot.');
        }
    }

    return {updateBoard};
})();