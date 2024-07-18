import Board from './Board';
import Player from './Player';
import readline from 'readline';

class Game {
    private board: Board;
    private players: Player[];
    private currentPlayerIndex: number;
    private rl: readline.Interface;

    constructor() {
        // Initialize the game board and players
        this.board = new Board();
        this.players = [new Player('B'), new Player('W')];
        this.currentPlayerIndex = 0; // Start with the first player

        // Initialize the readline interface
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.startGame();
    }

    private startGame(): void {
        // Start the game by rendering the board and prompting the first move
        this.render();
        this.promptMove();
    }

    private render(): void {
        const currentPlayer = this.players[this.currentPlayerIndex]; // Get the current player
        const validMoves = this.board.getValidMoves(currentPlayer.color); // Get valid moves for the current player
        this.board.renderBoard(validMoves); // Render the board with valid moves highlighted
        console.log(`Current Player: ${currentPlayer.color}`);
        console.log(`Valid moves: ${validMoves.join(', ')}`);
    }

    private playMove(input: string): void {
        const position = parseInt(input.trim()); // Get the position from the input
        const row = Math.floor((position - 1) / 8); // Calculate the row
        const col = (position - 1) % 8; // Calculate the column
        const currentPlayer = this.players[this.currentPlayerIndex]; // Get the current player

        if (this.board.isValidMove(row, col, currentPlayer.color)) {
            this.board.makeMove(row, col, currentPlayer.color); // Make the move
            this.switchPlayer(); // Switch to the other player
            if (!this.board.getValidMoves(this.players[this.currentPlayerIndex].color).length) {
                // If the next player has no valid moves, switch back
                this.switchPlayer();
                if (!this.board.getValidMoves(this.players[this.currentPlayerIndex].color).length) {
                    // If both players have no valid moves, end the game
                    this.endGame();
                    return;
                }
            }
            this.render(); // Render the board after the move
        } else {
            console.log('Invalid move. Try again.');
        }
        this.promptMove(); // Prompt the next move
    }

    private promptMove(): void {
        this.rl.question('Enter your move (1-64): ', (input: string) => {
            this.playMove(input);
        });
    }

    private switchPlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2; // Switch between players
    }

    private endGame(): void {
        let blackCount = 0;
        let whiteCount = 0;

        // Count the number of pieces for each player
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board.grid[row][col] === 'B') blackCount++;
                if (this.board.grid[row][col] === 'W') whiteCount++;
            }
        }

        // Display the final scores and announce the winner
        console.log('Game over!');
        console.log(`Black: ${blackCount}, White: ${whiteCount}`);
        if (blackCount > whiteCount) {
            console.log('Black wins!');
        } else if (whiteCount > blackCount) {
            console.log('White wins!');
        } else {
            console.log('It\'s a tie!');
        }

        // Close the readline interface
        this.rl.close();
    }
}

export default Game;
