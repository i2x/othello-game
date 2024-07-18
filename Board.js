"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor() {
        this.grid = Array.from({ length: 8 }, () => Array(8).fill(' '));
        this.initializeBoard();
    }
    initializeBoard() {
        this.grid[3][3] = 'W';
        this.grid[3][4] = 'B';
        this.grid[4][3] = 'B';
        this.grid[4][4] = 'W';
    }
    printBoard() {
        console.log('  0 1 2 3 4 5 6 7');
        this.grid.forEach((row, index) => {
            console.log(index, row.join(' '));
        });
    }
    isValidMove(x, y, player) {
        // Add logic to check if a move is valid
        return true;
    }
    placePiece(x, y, player) {
        // Add logic to place a piece and flip opponent's pieces
        this.grid[x][y] = player;
    }
}
exports.default = Board;
