class Board {
    grid: string[][]; // This will hold our board

    constructor() {
        // Initialize an 8x8 grid filled with empty spaces (' ')
        this.grid = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                row.push('.');
            }
            this.grid.push(row);
        }
        this.initializeBoard(); // Set up the initial four pieces
    }

    // This method sets up the initial pieces on the board
    initializeBoard(): void {
        this.grid[3][3] = 'W'; // White piece
        this.grid[3][4] = 'B'; // Black piece
        this.grid[4][3] = 'B'; // Black piece
        this.grid[4][4] = 'W'; // White piece
    }

    // This method prints the board to the console
    printBoard(): void {
        console.log('  0 1 2 3 4 5 6 7'); // Print column headers
        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];
            console.log(i, row.join(' ')); // Print each row with its index
        }
    }


    
}

// Export the Board class so it can be used in other files
export default Board;
