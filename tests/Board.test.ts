import Board from '../src/Board';

describe('Board', () => {
    let board: Board;

    beforeEach(() => {
        board = new Board();
    });

    test('should initialize the board with correct initial pieces', () => {
        expect(board.grid[3][3]).toBe('W');
        expect(board.grid[3][4]).toBe('B');
        expect(board.grid[4][3]).toBe('B');
        expect(board.grid[4][4]).toBe('W');
    });


    
});
