import Board from './Board';
import Player from './Player';
import readline from 'readline';

class Game {
    board: Board;
    players: Player[];
    currentPlayerIndex: number;
    rl: readline.Interface;

    constructor() {
        this.board = new Board();
        this.players = [new Player('B'), new Player('W')];
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
        this.rl.question(`${currentPlayer.color}, enter your move (1-64): `, (move) => {
            const moveNum = parseInt(move);
            if (!validMoves.includes(moveNum)) {
                console.log('Invalid move. Try again.');
                this.nextTurn();
            } else {
                const [row, col] = this.getMovePosition(moveNum);
                this.board.makeMove(row, col, currentPlayer.color);
                this.currentPlayerIndex = 1 - this.currentPlayerIndex;
                this.nextTurn();
            }
        });
    }

    // Convert move position to board coordinates
    getMovePosition(move: number): [number, number] {
        const row = Math.floor((move - 1) / 8);
        const col = (move - 1) % 8;
        return [row, col];
    }

    // Check if the game has ended
    isEndGame(): boolean {
        const validMovesB = this.board.getValidMoves('B');
        const validMovesW = this.board.getValidMoves('W');
        const boardIsFull = this.board.grid.flat().every(cell => cell !== null);
        return boardIsFull || (validMovesB.length === 0 && validMovesW.length === 0);
    }

    // Handle the end of the game
    endGame(): void {
        const score = this.getScore();
        console.log('Game Over!');
        console.log(`Final Score - Black (B): ${score.B}, White (W): ${score.W}`);
        if (score.B > score.W) {
            console.log('Black (B) wins!');
        } else if (score.W > score.B) {
            console.log('White (W) wins!');
        } else {
            console.log('It\'s a tie!');
        }
        this.rl.close();
    }

    // Get the current score of the game
    getScore(): { B: number, W: number } {
        let scoreB = 0;
        let scoreW = 0;
        for (const row of this.board.grid) {
            for (const cell of row) {
                if (cell === 'B') scoreB++;
                if (cell === 'W') scoreW++;
            }
        }
        return { B: scoreB, W: scoreW };
    }
}

export default Game;
