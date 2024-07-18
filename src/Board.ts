const boardSize = 8;
const directions: [number, number][] = [
    [0, 1], [1, 0], [0, -1],
    [-1, 0], [1, 1], [1, -1],
    [-1, 1], [-1, -1]
];

class Board {
    grid: (string | null)[][];

    constructor() {
        // Initialize an 8x8 grid filled with null
        this.grid = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
        this.initializeBoard(); // Set up the initial four pieces
    }

    // Set up the initial pieces on the board
    private initializeBoard(): void {
        this.grid[3][3] = 'W'; // White piece
        this.grid[3][4] = 'B'; // Black piece
        this.grid[4][3] = 'B'; // Black piece
        this.grid[4][4] = 'W'; // White piece
    }

    // Print the board to the console
    renderBoard(validMoves: number[]): void {
        console.clear();
        let position = 1;
        for (let row = 0; row < boardSize; row++) {
            let rowString = '';
            for (let col = 0; col < boardSize; col++) {
                if (validMoves.includes(position)) {
                    rowString += (position < 10 ? ' ' : '') + position + ' ';
                } else {
                    rowString += ' ' + (this.grid[row][col] || '.') + ' ';
                }
                position++;
            }
            console.log(rowString);
        }
    }

    // Check if a cell is empty
    isCellEmpty(x: number, y: number): boolean {
        return this.grid[x][y] === null;
    }

    // Check if a move is valid
    isValidMove(row: number, col: number, player: string): boolean {
        if (!this.isCellEmpty(row, col)) return false;

        const opponent = player === 'B' ? 'W' : 'B';

        for (const [dx, dy] of directions) {
            let x = row + dx;
            let y = col + dy;
            let hasOpponentBetween = false;

            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
                if (this.grid[x][y] === opponent) {
                    hasOpponentBetween = true;
                } else if (this.grid[x][y] === player) {
                    if (hasOpponentBetween) return true;
                    break;
                } else {
                    break;
                }
                x += dx;
                y += dy;
            }
        }
        return false;
    }

    // Place a piece on the board and flip opponent's pieces
    makeMove(row: number, col: number, player: string): void {
        this.grid[row][col] = player;

        for (const [dx, dy] of directions) {
            let x = row + dx;
            let y = col + dy;
            const toFlip: [number, number][] = [];

            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
                if (this.grid[x][y] === null) break;
                if (this.grid[x][y] === player) {
                    for (const [fx, fy] of toFlip) {
                        this.grid[fx][fy] = player;
                    }
                    break;
                }
                toFlip.push([x, y]);
                x += dx;
                y += dy;
            }
        }
    }

    // Get a list of valid moves for the current player
    getValidMoves(player: string): number[] {
        const validMoves: number[] = [];
        let position = 1;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (this.isValidMove(row, col, player)) {
                    validMoves.push(position);
                }
                position++;
            }
        }
        return validMoves;
    }
}

export default Board;
