import Board from './Board';
import Player from './Player';
import BotPlayer from './BotPlayer';
import readline from 'readline';

class Game {
    board: Board;
    players: Player[];
    currentPlayerIndex: number;
    rl: readline.Interface;
    gameMode: 'Human vs Human' | 'Human vs Bot';

    constructor(gameMode: 'Human vs Human' | 'Human vs Bot' = 'Human vs Bot') {
        this.board = new Board();
        this.gameMode = gameMode;
        this.players = [
            new Player('●'),
            gameMode === 'Human vs Bot' ? new BotPlayer('○') : new Player('○')
        ];
        this.currentPlayerIndex = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.startGame();
    }

    // Start the game loop
    startGame(): void {
        this.nextTurn();
    }

    // Handle each turn of the game
    nextTurn(): void {
        if (this.isEndGame()) {
            this.endGame();
            return;
        }

        const currentPlayer = this.players[this.currentPlayerIndex];
        const validMoves = this.board.getValidMoves(currentPlayer.color);

        if (validMoves.length === 0) {
            console.log(`${currentPlayer.color} has no valid moves.`);
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            this.nextTurn();
            return;
        }

        this.board.renderBoard(validMoves);
        this.showScore();

        if (currentPlayer instanceof BotPlayer) {
            // Bot player turn
            setTimeout(() => {
                const move = currentPlayer.chooseMove(this.board);
                if (move) {
                    this.board.makeMove(move[0], move[1], currentPlayer.color);
                    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
                    this.nextTurn();
                }
            }, 200); // Adding a delay for bot moves for a more natural feel
        } else {
            // Human player turn
            this.rl.question(`${currentPlayer.color}, enter your move (e.g., D3): `, (move) => {
                const [col, row] = move.toUpperCase();
                const colIndex = col.charCodeAt(0) - 65;
                const rowIndex = parseInt(row) - 1;
                if (!validMoves.some(([x, y]) => x === rowIndex && y === colIndex)) {
                    console.log('Invalid move. Try again.');
                    this.nextTurn();
                } else {
                    this.board.makeMove(rowIndex, colIndex, currentPlayer.color);
                    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
                    this.nextTurn();
                }
            });
        }
    }

    // Check if the game has ended
    isEndGame(): boolean {
        const validMovesB = this.board.getValidMoves('●');
        const validMovesW = this.board.getValidMoves('○');
        const boardIsFull = this.board.grid.flat().every(cell => cell !== null);
        return boardIsFull || (validMovesB.length === 0 && validMovesW.length === 0);
    }

    // Handle the end of the game
    endGame(): void {
        const score = this.board.getScore();
        console.log('Game Over!');
        console.log(`Final Score - Black (●): ${score['●']}, White (○): ${score['○']}`);
        if (score['●'] > score['○']) {
            console.log('Black (●) wins!');
        } else if (score['○'] > score['●']) {
            console.log('White (○) wins!');
        } else {
            console.log('It\'s a tie!');
        }
        this.rl.close();
    }

    // Show the current score of the game
    showScore(): void {
        const score = this.board.getScore();
        console.log(`Current Score - Black (●): ${score['●']}, White (○): ${score['○']}`);
    }
}

export default Game;
